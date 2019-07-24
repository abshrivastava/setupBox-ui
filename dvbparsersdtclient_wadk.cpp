/**
 * Copyright (C) 2006-2013 Wyplay, All Rights Reserved.
 * This source code and any compilation or derivative thereof is the proprietary
 * information of Wyplay and is confidential in nature.
 * Under no circumstances is this software to be exposed to or placed
 * under an Open Source License of any type without the expressed written
 * permission of Wyplay.
 *
 * @file DVBParserSDTClient_Wadk.cpp
 *
 */

#include "dvbparsersdtclient_wadk.h"
#include <errno.h>
#include <libwy/wylog.h>
#include <wydvb/parser_dvb_descriptors.h>
#include "dvbservice_wadk.h"
#include "dvbservicelist.h"
#include "location.h"
#include "transponder.h"
#include "transpondertype.h"
#include "wyscanfactory.h"
#include "dumpobjectcount.h"
#include <stdlib.h>
#include <stdio.h>
#include <sstream>
#include "transponder_wadk.h"
#include "wyscanwarehouse_wadk.h"

DVBParserSDTClientWADK::DVBParserSDTClientWADK()
    : m_useListDescriptorTag(false)
    , m_serviceList(0)
    , m_wyscanFactory(0)
    , m_versionNumber(0xFF)
    , m_originalNetworkID(0)
    , m_transportStreamID(0)
{
    INCREMENT_COUNT("DVBParserSDTClientWADK");
}

DVBParserSDTClientWADK::~DVBParserSDTClientWADK()
{
    if (m_serviceList) {
        delete m_serviceList;
    }
    DECREMENT_COUNT("DVBParserSDTClientWADK");
}

void DVBParserSDTClientWADK::onNewSectionSDT(SectionSDT& sectionSDT)
{
    onSDTFound();

    if (m_pCurrentTransponder != NULL)
    {
		if (sectionSDT.tableID() == TID_SDT_ACT)
		{
		    m_pCurrentTransponder->setOriginalNetworkID(sectionSDT.originalNetworkID());
		    m_pCurrentTransponder->setTransportStreamID(sectionSDT.transportStreamID());
	            (static_cast<TransponderWADK*>(m_pCurrentTransponder.get()))->setSdtaVersion(sectionSDT.versionNumber());
		}
    }

    if (sectionSDT.tableID() == TID_SDT_ACT) {
        setVersionNumber(sectionSDT.versionNumber());
        setOriginalNetworkID(sectionSDT.originalNetworkID());
        setTransportStreamID(sectionSDT.transportStreamID());
    }

    ServiceID id = DVBService::makeId(sectionSDT.originalNetworkID(), 
                                      sectionSDT.transportStreamID(),
                                      sectionSDT.serviceID());


    DVBService::Ptr service = m_serviceList->serviceByID(id);
    DVBServiceWADK::Ptr serviceBase;

    if (service == NULL) {
        service = m_wyscanFactory->createServiceWithServiceID(id);
        m_serviceList->addService(service);
    }
    else
    {
    }
    if (sectionSDT.tableID() == TID_SDT_ACT) {
        service->location()->addLocation(DVB_SDT_ACT_FOUND);
    } else {
        service->location()->addLocation(DVB_SDT_OTH_FOUND);
    }

    wl_info( "%s@%d - SDT-%s Service Id = %d (0x%04X) added TSID = %d",
                 __FUNCTION__, __LINE__, (sectionSDT.tableID() == TID_SDT_ACT) ? "Act" : "Oth",
                 (int) sectionSDT.serviceID(), sectionSDT.serviceID(), sectionSDT.transportStreamID() );

    service->setIsScrambled( sectionSDT.freeCAMode() | service->isScrambled() );
    service->setEITAvailable( sectionSDT.eitScheduleFlag() );
    service->setEITPresentFollowingAvailable( sectionSDT.eitPresentFollowingFlag() );
    service->setRunningStatus( sectionSDT.runningStatus() );

    std::vector<unsigned short> tagList = sectionSDT.descriptorTagList();
    for (size_t j = 0; j < tagList.size(); ++j) {
        std::vector<dvb_descriptors_t> desc;
        sectionSDT.dvbDescriptors(tagList[j], desc);
        for(size_t k = 0; k < desc.size(); k++) {
           checkTags(tagList[j], desc[k], service);
           if (m_useListDescriptorTag) {
               m_listDescriptorTag.push_back(tagList[j]);
           }
        }
    }
}

void DVBParserSDTClientWADK::onSectionSDTCompleted()
{
    onSectionCompleted();
}

void DVBParserSDTClientWADK::onSDTFound()
{
    onTableFound();
}

const DVBServiceList* DVBParserSDTClientWADK::serviceList() const
{
    return m_serviceList;
}

void DVBParserSDTClientWADK::setWyscanFactory(WyscanFactory* wyscanFactory)
{
    if (!wyscanFactory)
        return;

    m_wyscanFactory = wyscanFactory;
    m_serviceList = m_wyscanFactory->createEmptyServiceList();
}

std::string to_string( int Value )
{
    std::ostringstream oss;
    oss << Value;
    return oss.str();
}

WyscanFactory* DVBParserSDTClientWADK::wyscanFactory() const
{
    return m_wyscanFactory;
}

void DVBParserSDTClientWADK::checkTags(unsigned short tag,
                                   dvb_descriptors_t& desc,
                                   DVBService::Ptr serviceBase)
{
    DVBServiceWADK::Ptr service;
    service =  (DVBServiceWADK *)serviceBase.get();
    service->setPriceTag(0); // Set default price tag of the service to 0
    switch(tag) {
    case DESC_TAG_service:
    {
        service_desc_t* svr = desc.serviceDesc;
        service->setType(svr->service_type);
        service->setProviderName(std::string((char*)svr->service_provider_name, svr->service_provider_name_len));
        service->setName(std::string((char*)svr->service_name, svr->service_name_len));
        wl_info( "SDT Service Name = '%s' Provider Name = '%s' service type = '%d'",
                     service->name().c_str(),
                     service->providerName().c_str(),
                     service->type( ));
        break;
    }
    case DESC_TAG_CA_identifier:
        break;
    case DESC_TAG_service_availability:
    {
        //service_availability_desc_t* av = desc.serviceAvailabilityDesc;
        //service->m_bAvailabilityFlag = av->availability_flag;
        /*for (int i = 0; i < av->cell_id_len; ++i) {
            service->m_pwCellIds[i] = av->cell_id_lst[i];
        }*/
        break;
    }
    case DESC_TAG_linkage:
    {
        linkage_desc_t* link = desc.linkageDesc;
        if (link->linkage_type == ewydvb_parser_linkage_service_replacement) {
            service->addReplacementService(link->original_network_id,
                                           link->transport_stream_id,
                                           link->service_id);
        }
        break;
    }
    case DESC_TAG_content:
    {
	uint8_t intgenre;
	int k =0;
        std::string strgenre;

        strgenre += ",";

        for (uint8_t i = 0; i < desc.contentDesc->content_len; ++i) {

            intgenre = (desc.contentDesc->content_lst[i].content_nibble_level_1<<4) | \
                        desc.contentDesc->content_lst[i].content_nibble_level_2;

            /* We need to store only Genre valid in Dish broadcast
	     * even if Box is in videcon network
	     * */
	    switch(intgenre)
	    {
                case 1:
                case 2:
	        case 4:
	        case 5:
		case 8:
		case 6:
		case 11:
		case 13:
		case 14:
		case 15:
		case 17:
		case 18:
		case 19:
		case 20:
		case 21:
		case 23:
		case 26:
		case 27:
		case 28:
		case 29:
		case 44:
		case 45:
		case 46:
		case 888:
		case 999:
                   if(k>0)
                   {
                       strgenre += ",";
                   }
                   strgenre += to_string( intgenre );
		   k++;
		break;
	    }
        }
        strgenre += ",";

        service->setGenre( strgenre );
        break;
    }
    case DESC_TAG_SDT_PRICE:
    {
		/* Price Tag Descriptor 0x87 Fields :
		-------------------------------------------------------
		    Field				No. Of bits
		--------------------------------------------------------
		descriptor_tag				8
		descriptor_length			8
		No of products				8
		for(i=0;i< No of products; i++)
		{
		        Product ID		8	//1-DishTV 2-Zing 3-SL
			No of HD channels	24
			Package Price		24
		}
		*/
	   unsigned int numberOfProducts = (unsigned int)desc.privateDesc->private_data[0];

	   for(int i=0; i< numberOfProducts; i++)
	   {
		unsigned int productID = (unsigned int)desc.privateDesc->private_data[7*i + 1];

		if( productID == PRODUCT_ID_DISHTV) //Product ID is 1 for DishTV
		{
		    int pricetag = (((unsigned int)desc.privateDesc->private_data[7*i + 5] << 16) | ((unsigned int)desc.privateDesc->private_data[7*i + 6] << 8) | (unsigned int)desc.privateDesc->private_data[7*i + 7]);
		    service->setPriceTag(pricetag);
		    unsigned int numberOfChannels = (((unsigned int)desc.privateDesc->private_data[7*i + 2] << 16) | ((unsigned int)desc.privateDesc->private_data[7*i + 3] << 8) | (unsigned int)desc.privateDesc->private_data[7*i + 4]);
		    service->setNumberOfHDChannels(numberOfChannels);
		    wl_debug("DvbparserSDT: pricetag = %d numberOfChannels = %d",pricetag,numberOfChannels);
	       }
           }
       break;
    }
    default:
        break;
    }
}

void DVBParserSDTClientWADK::setUseListDescriptorTag(bool useListDescriptorTag)
{
    m_useListDescriptorTag = useListDescriptorTag;
}

bool DVBParserSDTClientWADK::useListDescriptorTag() const
{
    return m_useListDescriptorTag;
}

const std::vector<uint8_t>& DVBParserSDTClientWADK::listDescriptorTag() const
{
    return m_listDescriptorTag;
}

unsigned char  DVBParserSDTClientWADK::versionNumber() const
{
    return m_versionNumber;
}

void  DVBParserSDTClientWADK::setVersionNumber(unsigned char versionNumber)
{
    m_versionNumber = versionNumber;
}

unsigned short DVBParserSDTClientWADK::originalNetworkID() const
{
    return m_originalNetworkID;
}

void DVBParserSDTClientWADK::setOriginalNetworkID(unsigned short originalNetworkID)
{
    m_originalNetworkID = originalNetworkID;
}

unsigned short DVBParserSDTClientWADK::transportStreamID() const
{
    return m_transportStreamID;
}

void DVBParserSDTClientWADK::setTransportStreamID(unsigned short transportStreamID)
{
    m_transportStreamID = transportStreamID;
}

void DVBParserSDTClientWADK::setCurrentTransponder(Transponder::Ptr l_pCurrentTransponder)
{
    m_pCurrentTransponder = l_pCurrentTransponder;
}

Transponder::Ptr DVBParserSDTClientWADK::currentTransponder()
{
    return m_pCurrentTransponder;
}
