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

import {constructorOf, findWhere} from "utils"
import * as ChannelApi from "services/api/channels"
import bus from "services/bus"
import ChannelManager from "services/managers/ChannelManager"

/** @test {ChannelManager} */
describe("ChannelManager", function() {
  let getChannelsStub
  let getOTTChannelsStub
  let createFavoriteList
  let getFavoriteChannels

  before(function(done) {
    this.items = {
      channels: [
        {
          href: "test/id/0",
          title: "MTV HITS",
          obj_class: "CHANNEL_TV",
          lcn: 2,
          service_id: "4365098819",
          scrambled: "1",
        },
        {
          href: "test/id/1",
          title: "MTV",
          obj_class: "CHANNEL_TV",
          lcn: 13,
          service_id: "4365098820",
          scrambled: "0",
        },
        {
          href: "test/id/2",
          title: "rbb Berlin HD",
          obj_class: "CHANNEL_TV",
          lcn: 28,
          service_id: "4364511343",
          scrambled: "1",
        },
        {
          href: "test/id/3",
          title: "Arte",
          obj_class: "CHANNEL_TV",
          lcn: 1,
          service_id: "4341515348",
          scrambled: "0",
        },
      ],
    }

    getChannelsStub = stub(ChannelApi, "getChannels")
    getChannelsStub.returns(Promise.resolve(this.items))

    getOTTChannelsStub = stub(ChannelManager, "_fetchOttChannels")
    getOTTChannelsStub.returns(Promise.resolve())

    createFavoriteList = stub(ChannelApi, "createFavoriteList")
    createFavoriteList.returns(Promise.resolve())

    getFavoriteChannels = stub(ChannelApi, "getFavoriteChannels")
    getFavoriteChannels.returns(Promise.resolve({"channels":  []}))

    ChannelManager.update(false, false)
      .then(() => {
        done()
      })

  })

  after(() => {
    getChannelsStub.restore()
    getOTTChannelsStub.restore()
    createFavoriteList.restore()
    getFavoriteChannels.restore()
  })

  describe("arguments", () => {
    it("the attribute `current` should exist", () => {
      assert.ok(findWhere(Object.keys(ChannelManager), "current"))
    })
    it("the attribute `previous` should exist", () => {
      assert.ok(findWhere(Object.keys(ChannelManager), "previous"))
    })
    it("the attribute `channels` should be an array", () => {
      assert.ok(constructorOf(ChannelManager._channels), Array)
    })
  })

  /** @test {ChannelManager.setCurrent} */
  describe("setCurrent", () => {
    bus.once("tv:zap", () => {
      it("the attribute `current` should be set when `tv:zap` event is fired", () => {
        assert.equal(ChannelManager.current.title, "MTV HITS")
      })
    })
    bus.emit("tv:zap")
  })

  /** @test {ChannelManager.update} */
  describe("update", () => {
    /* it("should send an event `channels:updated`", () => {
      const eventSpy = spy()
      bus.once("channels:updated", (data) => {
        eventSpy.reset()
      })
      eventSpy.called
    })*/

    it("should update the `channels` attribute when asking for Channels to the Server", () => {
      return ChannelManager.update(false, false)
        .then(() => {
          assert.equal(ChannelManager.channels.length, 4)
        })
    })
  })

  /** @test {ChannelManager.getChannelFromServiceId} */
  describe("getChannelFromServiceId", () => {
    it("should return a Channel matching given serviceId", () => {
      const channel = ChannelManager.getChannelFromServiceId("4365098819")
      assert.equal(channel.title, "MTV HITS")
    })
    it("should return NULL if no Channel match given serviceId", () => {
      const channel = ChannelManager.getChannelFromServiceId("foo")
      assert.equal(channel, null)
    })
  })

  /** @test {ChannelManager.getChannelFromLcn} */
  describe("getChannelFromLcn", () => {
    it("should return a Channel matching given LCN", () => {
      return ChannelManager.getChannelFromLcn(1)
        .then((response) => {
          return assert.equal(response.resource.real.title, "Arte")
        })
    })
    it("should return nearest Channel if LCN is unknown", () => {
      return ChannelManager.getChannelFromLcn(30)
        .then((response) => {
          return assert.equal(response.resource.fallback.title, "Arte")
        })
    })
  })

  /** @test {ChannelManager.getTvChannelsOrderByLcn} */
  describe("orderByLcn", () => {
    it("should order by LCN", () => {
      const arr = ChannelManager.getTvChannelsOrderByLcn()
      assert.equal(arr[0].title, "Arte")
      assert.equal(arr[1].title, "MTV HITS")
      assert.equal(arr[2].title, "MTV")
      assert.equal(arr[3].title, "rbb Berlin HD")
    })
  })

  /** @test {ChannelManager.getTvChannelsOrderByName} */
  describe("orderByName", () => {
    it("should order by Name", () => {
      const arr = ChannelManager.getTvChannelsOrderByName()

      assert.equal(arr[0].title, "Arte")
      assert.equal(arr[1].title, "MTV")
      assert.equal(arr[2].title, "MTV HITS")
      assert.equal(arr[3].title, "rbb Berlin HD")
    })
  })

  /** @test {ChannelManager.getTvChannelsOrderByNameFTA} */
  describe("orderByName - FTA", () => {
    it("should order by NAME and only Free To Air channels", () => {
      const arr = ChannelManager.getTvChannelsOrderByNameFTA()
      assert.equal(arr.length, 2)
      assert.equal(arr[0].title, "Arte")
      assert.equal(arr[1].title, "MTV")
    })
  })

  /** @test {ChannelManager.getTvChannelsOrderByNameCAS} */
  describe("orderByName - CAS", () => {
    it("should order by NAME and only Scrambled channels", () => {
      const arr = ChannelManager.getTvChannelsOrderByNameCAS()
      assert.equal(arr.length, 2)
      assert.equal(arr[0].title, "MTV HITS")
      assert.equal(arr[1].title, "rbb Berlin HD")
    })
  })

  /** @test {ChannelManager.setChannelFavorite} */
  describe("Set as Favorite", () => {
    it("Should set favorite attribute for a specific channel", () => {
      const channel = ChannelManager.channels[0]
      assert.equal(channel.favorite, false)
      ChannelManager.setChannelFavorite(channel.id, true)
      assert.equal(channel.favorite, true)
      ChannelManager.setChannelFavorite(channel.id, false)
      assert.equal(channel.favorite, false)
    })
  })
})
