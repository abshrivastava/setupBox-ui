//
// Copyright (C) 2006-2016 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//

import assert from "assert"
import Controller from "utils/Controller"

/** @test {Controller} */
describe("Controller", () => {

  /** @test {Controller.activeDelegate} */
  describe("activeDelegate", () => {
    const controller = new Controller()
    it("should by default to null", () => {
      assert.equal(controller.activeDelegate, null)
    })
  })

  /** @test {Controller.displayName} */
  describe("displayName", () => {
    class NamedController extends Controller {}

    const controller = new Controller()
    const namedController = new NamedController()

    it("should be empty for Controller instances", () => {
      assert.equal(controller.displayName, "")
    })

    it("should be computed by removing Controller from the constructor " +
      "name in Controller subclasses instances", () => {
      assert.equal(namedController.displayName, "Named")
    })
  })

  /** @test {Controller.delegates} */
  describe("delegates", () => {
    class DelegateController extends Controller {
    }
    class DelegatingController extends Controller {
      static delegates = [DelegateController]
    }

    const controller = new DelegatingController()
    const delegate = controller.delegates[0]

    it("should be automatically added, based on the static delegates property",
      () => {
        assert.equal(controller.delegates.length, 1)
      })

    it("should instanciates delegate controllers", () => {
      assert(delegate instanceof DelegateController)
    })

    it("should allow accessing the delegate through a property named after " +
    "its displayName", () => {
      assert.equal(delegate, controller.Delegate)
    })
  })
})
