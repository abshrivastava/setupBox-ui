//
// Copyright (C) 2006-2016 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//
import assert from "assert"
import {stub} from "sinon"
import {describe} from "mocha"
import {findWhere} from "utils"
import * as DateUtils from "utils/date"

import DvbAds from "services/models/ads/DvbAds"

/** @test {DvbAds} */
describe("DvbAds", function() {

  before(() => {
    const json = {
      "20160708":{
        "0_to_1":"000IP00",
        "1_to_2":"000IP01",
      },
      "20160709":{
        "0_to_1":"000IP02",
        "1_to_2":"000IP03",
      },
    }
    this.dvbAds = new DvbAds(json)
  })

  describe("constructor", () => {
    it("should create DvbAds model with some programs", () => {
      assert.ok(findWhere(Object.keys(this.dvbAds), "programs"))
    })
  })

  describe("getCurrentCampaignId", () => {
    it("should return correct campaignId", () => {
      this.getCampaignFromDate = stub(this.dvbAds, "getCampaignFromDate").returns("000IP00")
      this.convertFullDate = stub(DateUtils, "convertFullDate").returns("20160708")
      const campaignId = this.dvbAds.getCurrentCampaignId()
      assert.equal(campaignId, "000IP00")
      this.getCampaignFromDate.restore()
      this.convertFullDate.restore()
    })
    it("Should return null if no match", () => {
      this.convertFullDate = stub(DateUtils, "convertFullDate").returns("20160710")
      const campaignId = this.dvbAds.getCurrentCampaignId()
      assert.equal(campaignId, null)
      this.convertFullDate.restore()
    })
  })

  describe("getCampaignId", () => {
    it("should return matching campaign with current date", () => {
      const currentDate = new Date(1474672931167)
      const campaignId = this.dvbAds.getCampaignFromDate("20160709", currentDate)
      assert.equal(campaignId, "000IP03")
    })
    it("should return null if no match with date", () => {
      const currentDate = new Date(1474672931167)
      const campaignId = this.dvbAds.getCampaignFromDate("20160710", currentDate)
      assert.equal(campaignId, null)
    })
    it("should return null if no match with hour", () => {
      const currentDate = new Date(1474676531167)
      const campaignId = this.dvbAds.getCampaignFromDate("20160709", currentDate)
      assert.equal(campaignId, null)
    })
  })
})
