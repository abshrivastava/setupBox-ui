//
// Copyright (C) 2006-2015 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//

import assert from "assert"

import Model from "services/Model"

/** @test {Model} */
describe("Model", () => {

  /** @test {Model.constructor} */
  describe("constructor", () => {
    it("should create a blank model", () => {
      const model = new Model()
      assert(Object.keys(model.getAttributes()).length === 0)
    })
  })

  /** @test {Model.getAttributes} */
  describe("getAttributes", () => {
    it("should return a copy of the internal attributes", () => {
      const model = new Model()
      const attrs = model.getAttributes()

      assert.notEqual(model.getAttributes(), model._attributes)
    })
  })

  describe("attribute specs", () => {
    class ModelWithAttributes extends Model {
      static attributes = {
        attrWithDefault: {
          default: "default value",
        },
        attrWithDefaultFunction: {
          default: (attrs) => attrs.attrForDefaultFunc,
        },
        attrFrom: {
          from: "attr_from",
        },
        attrConvert: {
          convert: (a) => parseInt(a, 10),
        },
        attrRequired: {
          required: true,
        },
      }
    }

    const model = new ModelWithAttributes({
      attrForDefaultFunc: "attr for default func",
      attr_from: "attr from value",
      attrConvert: "42",
      attrRequired: "value",
    })

    it("assigns default values for attributes with a default", () => {
      assert.equal(model.attrWithDefault, "default value")
    })

    it("assigns default values for attributes with a default function",
      () => {
        assert.equal(model.attrWithDefaultFunction, "attr for default func")

      })

    it("uses a from clause to get the value from another attribute", () => {
      assert.equal(model.attrFrom, "attr from value")
    })

    it("converts attribute values using the convert clause", () => {
      assert.equal(model.attrConvert, 42)
    })

    it("throws an error if a required field is missing", () => {
      assert.throws(() => new ModelWithAttributes(),
      /required field attrRequired/)
    })
  })
})



