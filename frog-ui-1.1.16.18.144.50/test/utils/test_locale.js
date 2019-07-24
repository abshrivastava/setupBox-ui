//
// Copyright (C) 2006-2016 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//

import assert from "assert"
import "jsdom-global/register"

import {describe} from "mocha"
import {Locale} from "utils/locale"
import {wait} from "utils"

const lang = "fr"
const data = {
  "locale-fr_FR": {
    "" : {
    },
    Frog: [
      null,
      "Grenouille",
    ],
  },
}

/** @test {Locale} */
describe("Locale", () => {


  /** @test {Locale.translate} */
  describe("translate", () => {
    const locale = new Locale(data)
    locale.current = lang
    it("should translate correctly", () => {
      assert.equal(locale.translate("Frog"), "Grenouille")
    })
    it("should the argument if no translation found",
      () => {
        assert.equal(locale.translate("Fro"), "Fro")
        assert.deepEqual(locale.translate({}), {})
        assert.deepEqual(locale.translate({a: 1}), {a: 1})
        assert.deepEqual(locale.translate([]), [])
        assert.deepEqual(locale.translate([1,2]), [1,2])
      })

    it("should return an empty string if !argument", () => {
      assert.equal(locale.translate(false), "")
      assert.equal(locale.translate(""), "")
      assert.equal(locale.translate(null), "")
      assert.equal(locale.translate(undefined), "")
    })
  })
})

/** @test {Locale.current} */
describe("Locale.current", () => {
  const locale = new Locale(data)
  it("should be set and get", () => {
    locale.current = lang
    assert.equal(locale.current, "fr")
  })
})

/** @test {Locale.translateTextNodes} */
describe("Locale.translateTextNodes", () => {
  const divFrog = document.createElement("div")
  divFrog.textContent = "Frog"
  divFrog.firstChild.msgId = "Frog"

  const divFrogSub = document.createElement("div")
  divFrogSub.textContent = "Frog"
  divFrogSub.firstChild.msgId = "Frog"
  divFrogSub.firstChild.limit = {start:0 , end:3}

  const divFoo = document.createElement("div")
  divFoo.textContent = "Foo"
  divFoo.firstChild.msgId = "Foo"

  document.body.appendChild(divFrog)
  document.body.appendChild(divFrogSub)
  document.body.appendChild(divFoo)

  const locale = new Locale(data)
  locale.current = lang
  locale.translateTextNodes()
  it("should translate Node that can be translated", () => {
    assert.equal(divFoo.textContent, "Foo")
    assert.equal(divFrog.textContent, "Grenouille")
  })

  it("should substring the traslation if needed", () => {
    assert.equal(divFrogSub.textContent, "Gre")
  })
})

