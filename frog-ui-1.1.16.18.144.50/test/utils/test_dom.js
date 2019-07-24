//
// Copyright (C) 2006-2016 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//

import "jsdom-global/register"
import {spy} from "sinon"
import assert from "assert"
import {describe, beforeEach, afterEach} from "mocha"
import {wait} from "utils"
import {
  pushState,
  pullState,
  addTransitionListener,
  removeTransitionListener,
  disableTransitions,
  restoreTransitions,
  waitReflow,
  clearNode,
} from "utils/dom"


describe("dom", () => {
  let testDiv
  let event

  beforeEach((done) => {
    testDiv = document.createElement("div")
    testDiv.id = "testId"
    testDiv.className = "testClass"
    testDiv.innerHTML = "<h1 id='title'> Hello </h1>"

    event = document.createEvent('Event')
    event.initEvent('webkitTransitionEnd', true, true)
    done()
  })

  afterEach((done)=> {
    testDiv = null
    event = null
    done()
  })

  /** @test {pushState} */
  describe("pushState", () => {
    it("should adds a new class on specific Element", () => {
      return pushState(testDiv, "selected", false)
        .then(() => {
          return assert.equal(testDiv.className, "testClass testClass--selected")
        })
    })

    it("should adds a new class on specific Element even if no className was present", () => {
      const anotherTestDiv = document.createElement("div")
      return pushState(anotherTestDiv, "selected", false)
        .then(() => {
          return assert.equal(anotherTestDiv.className, "u--selected")
        })
    })

    it("should returns a Promise if class already exists", () => {
      testDiv.className = "testClass testClass--selected"
      return pushState(testDiv, "selected", false)
        .then(() => {
          return assert.ok(true)
        })
    })
  })

  /** @test {pullState} */
  describe("pullState", () => {
    it("should removes a class on specific Element", () => {
      testDiv.classList.add("item--selected")
      return pullState(testDiv, "selected", false, "item")
        .then(() => {
          return assert.equal(testDiv.className, "testClass")
        })
    })

    it("should returns a Promise if class doesn't exists", () => {
      return pullState(testDiv, "selected", false, "item")
        .then(() => {
          return assert.ok(true)
        })
    })

    it("should removes a class on specific Element and willTransition is set to True", () => {
      return pullState(testDiv, "selectedWithTransition", true, "item")
        .then(() => {
          return assert.equal(testDiv.className, "testClass")
        })
    })

  })

  describe("transitionListeners", () => {
    const transitionSpy = spy()
    /** @test {addTransitionListener} */
    describe("addTransitionListener", () => {
      it("should registers the specified callback on the Element it's called on.", () => {
        addTransitionListener(testDiv, transitionSpy)
        testDiv.dispatchEvent(event)
        assert(transitionSpy.calledOnce)
      })
    })

    /** @test {removeTransitionListener} */
    describe("removeTransitionListener", () => {
      transitionSpy.reset()
      it("should unregisters the specified callback on the Element it's called on.", () => {
        removeTransitionListener(testDiv, transitionSpy)
        testDiv.dispatchEvent(event)
        assert.notEqual(transitionSpy.calledTwice)
      })
    })
  })

  /** @test {disableTransitions} */
  describe("disableTransitions", () => {
    it("should add adds a class u-noTransitions on Element", () => {
      disableTransitions(testDiv)
      assert.equal(testDiv.className, "testClass u-noTransitions")
    })

    it("should add adds class u-noTransitions on Element only once", () => {
      testDiv.className = ""
      disableTransitions(testDiv)
      assert.equal(testDiv.classList.length, 1)
    })
  })

  /** @test {restoreTransitions} */
  describe("restoreTransitions", () => {
    it("should removes class u-noTransitions from Element", () => {
      restoreTransitions(testDiv)
      assert.equal(testDiv.className, "testClass")
    })
    it("should not throw an error if class u-noTransitions not on Element", () => {
      restoreTransitions(testDiv)
      assert.equal(testDiv.className, "testClass")
    })
  })

  /** @test {waitReflow} */
  describe("waitReflow", () => {
    it("should return undefined", () => {
      assert.equal(waitReflow(testDiv), undefined)
    })
  })

  /** @test {clearNode} */
  describe("clearNode", () => {
    it("should remove all children of an Element", () => {
      clearNode(testDiv)
      assert.equal(testDiv.children.length, 0)
    })
  })

})
