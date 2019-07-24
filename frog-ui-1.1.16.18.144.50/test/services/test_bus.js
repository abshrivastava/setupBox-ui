//
// Copyright (C) 2006-2016 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//

import assert from "assert"

import {describe} from "mocha"

import config from "utils/config"
import {Bus} from "services/bus"
import {noop} from "utils"
import appConfig from "app/config"

/** @test {Bus} */
describe("Bus", () => {

  /** @test {Bus.constructor} */
  describe("constructor", () => {
    const bus = new Bus()

    it("should create an emitter", () => {
      assert(bus.emit)
    })

    it("should set the default universe to bigbang", () => {
      assert.equal(bus.universe, "bigbang")
    })
  })

  /** @test {Bus.handleRcuEvent} */
  describe("handleRcuEvent", () => {
    const bus = new Bus()

    bus.on("rcu#bigbang:up:press", (keyname, ev) => {
      it("should emit an event for recognized keys", noop)
      it("should pass the key name to the event handler", () => {
        assert.equal(keyname, "UP")
      })
      it("should pass the event object to the event handler", () => {
        assert.equal(ev.foo, "bar")
      })
    })
    bus.handleRcuEvent(config.KEYMAP.UP, "press", {foo: "bar"})

    bus.on("rcu#bigbang:numeric:press", (keynum, ev) => {

      it("should emit an additional event for numeric keys", noop)
      it("should pass the numeric key number to the event handler", () => {
        assert.equal(keynum, 0)
      })
    })
    bus.handleRcuEvent(config.KEYMAP.KEY_0, "press", {foo: "bar"})

    bus.on("rcu#bigbang:any:press", (keyname, ev) => {
      it("should emit an additional event for numeric keys", noop)
      it("should pass the key name to the event handler", () => {
        assert.equal(keyname, "PLAY")
      })
    })
    bus.handleRcuEvent(config.KEYMAP.PLAY, "press", {foo: "bar"})
  })

  /** @test {Bus.openUniverse */
  describe("openUniverse", () => {
    const bus = new Bus()

    bus.on("foo:open", () => {
      it("should emit an open event for the new universe", noop)
    })
    bus.openUniverse("foo")
      it("should change the current universe", () => {
        assert.equal(bus.universe, "foo")
      })
  })

  /** @test {Bus.closeCurrentUniverse} */
  describe("closeCurrentUniverse", () => {
    const bus = new Bus()

    bus.on("bigbang:close", () => {
      it("should emit a close event for the old universe", noop)
    })
    bus.closeCurrentUniverse()
    assert.equal(bus.universe, null)
  })

})
