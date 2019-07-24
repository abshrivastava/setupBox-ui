//
// Copyright (C) 2006-2016 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//

import assert from "assert"
import sinon from "sinon"

import {describe} from "mocha"
import {findWhere} from "utils"

import AdsManager from "services/managers/AdsManager"

/** @test {AdsManager} */
describe("AdsManager", function() {
  beforeEach(() => {
    this.json = {
      "campaigns":{
        "000IP00":{
          "mediaFile":"mediaFile.1",
        },
        "000IP01":{
          "mediaFile":"mediaFile.2",
        },
      },
      "program":{
        "Home":{
          "20160708":{
            "0_to_1":"000IP00",
            "1_to_2":"000IP01",
          },
          "20160709":{
            "0_to_1":"000IP00",
            "1_to_2":"000IP01",
          },
        },
        "channelList":{
          "20160708":{
            "0_to_1":"000IP00",
            "1_to_2":"000IP01",
          },
        },
        "tvGrid":{
          "20160708":{
            "0_to_1":"000IP00",
            "1_to_2":"000IP01",
          },
        },
        "tvRecording":{
          "20160708":{
            "0_to_1":"000IP00",
            "1_to_2":"000IP01",
          },
        },
      },
    }
  })

  describe("constructor", () => {
    it("should create HomeAds model", () => {
      assert.ok(findWhere(Object.keys(AdsManager), "homeAds"))
    })
    it("should create EpgAds model", () => {
      assert.ok(findWhere(Object.keys(AdsManager), "epgAds"))
    })
    it("should create PvrAds model", () => {
      assert.ok(findWhere(Object.keys(AdsManager), "pvrAds"))
    })
    it("should create ChannelListAds model", () => {
      assert.ok(findWhere(Object.keys(AdsManager), "channelListAds"))
    })
    it("should create Campaign model", () => {
      assert.ok(findWhere(Object.keys(AdsManager), "campaigns"))
    })
  })

  describe("fillManager", () => {
    before(() => {
      AdsManager.fillManager(this.json)
    })

    it("should fill Campaign", () => {
      assert.ok(findWhere(Object.keys(AdsManager.campaigns), "000IP00"))
      assert.ok(findWhere(Object.keys(AdsManager.campaigns), "000IP01"))
    })
    it("should fill HomeAds", () => {
      assert.ok(findWhere(Object.keys(AdsManager.homeAds.programs), "20160708"))
      assert.ok(findWhere(Object.keys(AdsManager.homeAds.programs), "20160709"))
    })
    it("should fill EpgAds", () => {
      assert.ok(findWhere(Object.keys(AdsManager.epgAds.programs), "20160708"))
    })
    it("should fill PvrAds", () => {
      assert.ok(findWhere(Object.keys(AdsManager.pvrAds.programs), "20160708"))
    })
    it("should fill ChannelListAds", () => {
      assert.ok(findWhere(Object.keys(AdsManager.channelListAds.programs), "20160708"))
    })
  })

  describe("fetchDvbAds", () => {
    it("should return correct mediaFile", () => {
      const stubGetCampaignId = sinon.stub(AdsManager.homeAds, "getCurrentCampaignId").returns("000IP00")
      AdsManager.fetchDvbAds("home")
      assert.equal(AdsManager.ad.mediaFile, "mediaFile.1")
      stubGetCampaignId.restore()
    })
    it("should return default banner if universe is undefined", () => {
      AdsManager.fetchDvbAds()
      assert.equal(AdsManager.ad.mediaFile, "app/assets/fallbacks/ad-banner.png")
    })
    it("should return default banner if universe doesn't exist", () => {
      AdsManager.fetchDvbAds("toto")
      assert.equal(AdsManager.ad.mediaFile, "app/assets/fallbacks/ad-banner.png")
    })
  })
})
