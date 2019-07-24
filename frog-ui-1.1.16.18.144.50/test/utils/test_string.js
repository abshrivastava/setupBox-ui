//
// Copyright (C) 2006-2016 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//

import assert from "assert"
import {describe} from "mocha"

import {
  padLeft,
  camelCase,
  capitalize,
  isoToName,
} from "utils/string"

/** @test {padLeft} */
describe("padLeft", () => {
  it("should pad string on its left using given size", () => {
    assert.deepEqual(padLeft("1", "0", 4), "0001")
  })
})

/** @test {capitalize} */
describe("capitalize", () => {
  it("should capitalizes the first letter of a string", () => {
    assert.deepEqual(capitalize("hello"), "Hello")
  })
})

/** @test {camelCase} */
describe("camelCase", () => {
  it("should transform a snake_case_string to a camelCaseString", () => {
    assert.deepEqual(camelCase("camel_case"), "camelCase")
  })
})

/** @test {isoToName} */
describe("isoToName", () => {
  it("should transform an iso code to a language", () => {
    assert.equal(isoToName("eng"), "English")
    assert.deepEqual(isoToName("mis"), "Miscellaneous")
    assert.deepEqual(isoToName("mul"), "Multiple")
    assert.deepEqual(isoToName("und"), "Undetermined")
    assert.deepEqual(isoToName("zxx"), "Animal")
    assert.deepEqual(isoToName(""), "Unknown")
    assert.deepEqual(isoToName("ger"), "Deutsch")
    assert.deepEqual(isoToName("deu"), "Deutsch")
  })
})

