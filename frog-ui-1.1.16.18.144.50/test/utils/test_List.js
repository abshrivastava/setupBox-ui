//
// Copyright (C) 2006-2015 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//

import assert from "assert"
import {describe} from "mocha"
import List from "utils/List"

/** @test {List} */
describe("List", () => {

  /** @test {List.constructor()} */
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

  /** @test {List.length} */
  describe("get length", () => {
    it("should return the length of the List", () => {
      let list = new List(["a", "b", "c"])
      assert(list.length === list.items.length)
      list = new List()
      assert(list.length === list.items.length)
    })
  })

  /** @test {List.\[Symbol.iterator\]()} */
  describe("Symbol.iterator", () => {
    it("should be iterable", () => {
      const list = new List([1, 2])
      assert(Symbol.iterator in Object(list))
    })
    it("should be spread", () => {
      const list = new List([1, 2])
      const list2 = new List([2, 3])
      list2.update([...list])
      assert.deepEqual(list.items, list2.items)
    })
  })

  /** @test {List.get()} */
  describe("get", () => {
    it("should return item at specified index", () => {
      const list = new List(["a", "b", "c"])
      assert(list.get(1) === "b")
      assert(list.get(0) === "a")
      assert(list.get(2) === "c")
    })

    // it("should throw an error if index is out of range", () => {
    //   const list = new List(["a", "b", "c"])
    //   assert.throws(() => list.get(-1), /out of range/)
    //   assert.throws(() => list.get(list.length), /out of range/)
    // })
    //
    // it("should throw an error if list is empty", () => {
    //   const list = new List([])
    //   assert.throws(() => list.get(), /empty list/)
    //   assert.throws(() => list.get(0), /empty list/)
    // })
  })

  /** @test {List.set()} */
  describe("set", () => {
    const list = new List(["a", "b", "c"])

    it("should set item at specified index", () => {
      list.set(1, "foo")
      assert.deepEqual(list.items, ["a", "foo", "c"])
      list.set(0, "foo2")
      assert.deepEqual(list.items, ["foo2", "foo", "c"])
      list.set(2, "foo3")
      assert.deepEqual(list.items, ["foo2", "foo", "foo3"])
      list.set(2, "c")
      assert.deepEqual(list.items, ["foo2", "foo", "c"])
    })

    // it("should throw an error if index is out of range", () => {
    //   const list = new List(["a", "b", "c"])
    //   assert.throws(() => list.set(-1, "a"), /out of range/)
    //   assert.throws(() => list.set(list.length, "b"), /out of range/)
    // })
    //
    // it("should throw an error if list is empty", () => {
    //   const list = new List([])
    //   assert.throws(() => list.set(0, "a"), /empty list/)
    // })
  })

  /** @test {List.push()} */
  describe("push", () => {
    const list = new List(["a", "b", "c"])
    it("should append items at the end of the List", () => {
      list.push(undefined, {a:2}, null)
      assert.deepEqual(list.items, ["a", "b", "c", undefined, {a:2}, null])
    })
  })

  /** @test {List.indexOf()} */
  describe("indexOf", () => {
    const obj = {a:2}
    const list = new List(["a", obj, undefined, undefined])
    it ("should return the index of the first specified item", () => {
      assert.equal(list.indexOf("a"), 0)
      assert.equal(list.indexOf(obj), 1)
      assert.equal(list.indexOf(undefined), 2)
    })
    it ("should return -1 if the specified item is not in the list", () => {
      assert.equal(list.indexOf("b"), -1)
      assert.equal(list.indexOf({a:2}), -1)
      assert.equal(list.indexOf(null), -1)
    })
  })

  /** @test {List.update()} */
  describe("update", () => {
    const list = new List([1, 2])

    it ("should update items", () => {
      list.update(["a", "b", "c"])
      assert.deepEqual(list.items, ["a", "b", "c"])
      list.update([])
      assert.deepEqual(list.items, [])
    })

    it ("should set an empty list in some cases", () => {
      list.update()
      assert.deepEqual(list.items, [])
      list.update(null)
      assert.deepEqual(list.items, [])
      list.update(undefined)
      assert.deepEqual(list.items, [])
    })

    it ("should create an array if object is not null and it not an array", () => {
      list.update({})
      assert.deepEqual(list.items, [{}])
      list.update({a: 2})
      assert.deepEqual(list.items, [{a: 2}])
      list.update("a")
      assert.deepEqual(list.items, ["a"])
    })
  })

  /** @test {List.getRange()} */
  describe("getRange", () => {
    const list = new List(["a", "b", "c"])

    it("should return all items in the specified range", () => {
      assert.deepEqual(list.getRange(0, 3), ["a", "b", "c"])
      assert.deepEqual(list.getRange(2, 1), ["c"])
      assert.deepEqual(list.getRange(0, 2), ["a", "b"])
    })

    it("should fill with null if out of range", () => {
      assert.deepEqual(list.getRange(0, 5), ["a", "b", "c", null, null])
      assert.deepEqual(list.getRange(2, 2), ["c", null])
      assert.deepEqual(list.getRange(5, 5), [null, null, null, null, null])
    })

    it("should take a negative length", () => {
      assert.deepEqual(list.getRange(5, -5), [null, null, null, "c", "b"])
      assert.deepEqual(list.getRange(4, -3), [null, null, "c"])
      assert.deepEqual(list.getRange(2, -3), ["c", "b", "a"])
    })
  })
})
