//
// Copyright (C) 2006-2015 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//

import assert from "assert"
import {describe, context} from "mocha"
import List from "utils/CircularList"

/** @test {CircularList} */
describe("CircularList", () => {

  /** @test {CircularList.constructor()} */
  describe("constructor", () => {
    const list = new List(["a", "b", "c"])
    it("should create a List object and check length is correct", () => {
      assert(list.items.length === 3)
    })

    it("should create a List object and check values are ok", () => {
      assert.deepEqual(list.items, ["a", "b", "c"])
    })

    it("should create an empty List object", () => {
      const eList = new List()
      assert(eList.items.length === 0)
      assert.deepEqual(eList.items, [])
    })

    it("should create a List object with non Array parameter", () => {
      const eList = new List({a: 3})
      assert(eList.items.length === 1)
      assert.deepEqual(eList.items, [{a: 3}])
    })
  })

  /** @test {CircularList.get()} */
  describe("get", () => {
    it("should return item at specified index", () => {
      const list = new List(["a", "b", "c"])
      assert(list.get(4) === "b")
      assert(list.get(0) === "a")
      assert(list.get(2) === "c")
      assert(list.get(-1) === "c")
    })
    // it("should throw an error if list is empty", () => {
    //   const list = new List([])
    //   assert.throws(() => list.get(), /empty list/)
    //   assert.throws(() => list.get(0), /empty list/)
    // })
  })

  /** @test {CircularList.set()} */
  describe("set", () => {
    const list = new List(["a", "b", "c"])
    it("should set item at specified index", () => {
      list.set(4, "foo")
      assert.deepEqual(list.items, ["a", "foo", "c"])
      list.set(0, "foo2")
      assert.deepEqual(list.items, ["foo2", "foo", "c"])
      list.set(2, "foo3")
      assert.deepEqual(list.items, ["foo2", "foo", "foo3"])
      list.set(-1, "c")
      assert.deepEqual(list.items, ["foo2", "foo", "c"])
    })
    // it("should throw an error if list is empty", () => {
    //   const list = new List([])
    //   assert.throws(() => list.set(0, "a"), /empty list/)
    // })
  })

  /** @test {CircularList.getRange()} */
  describe("getRange", () => {

    it("should return all items in the specified range", () => {
      const list = new List(["a", "b", "c"])
      assert.deepEqual(list.getRange(5, 2), ["c", "a"])
      assert.deepEqual(list.getRange(0, 5), ["a", "b", "c", "a", "b"])
      assert.deepEqual(list.getRange(0, 0), [])
    })

    it("should take a negative length", () => {
      const list = new List(["a", "b", "c"])
      assert.deepEqual(list.getRange(5, -5), ["c", "b", "a", "c", "b"])
      assert.deepEqual(list.getRange(4, -2), ["b", "a"])
      assert.deepEqual(list.getRange(2, -4), ["c", "b", "a", "c"])
    })

    // it("should throw an error if list is empty", () => {
    //   const list = new List([])
    //   assert.throws(() => list.getRange(0, 5), /empty list/)
    // })
  })
})
