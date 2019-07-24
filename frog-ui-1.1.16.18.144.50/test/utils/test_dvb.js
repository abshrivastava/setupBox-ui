//
// Copyright (C) 2006-2016 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//

import assert from "assert"

import {getCategory} from "utils/dvb"

describe("dvb", () => {

  describe("getCategory", () => {

    const CATEGORIES = {
      "cat_0x0": "",
      "cat_0x1": "Movie",
      "cat_0x2": "News",
      "cat_0x3": "Show",
      "cat_0x4": "Sports",
      "cat_0x5": "Youth",
      "cat_0x6": "Music",
      "cat_0x7": "Arts/Culture",
      "cat_0x8": "Social/Politics",
      "cat_0x9": "Education",
      "cat_0xA": "Leisure hobbies",
      "cat_0xB": "",
      "cat_0xC": "",
      "cat_0xD": "",
      "cat_0xE": "",
      "cat_0xF": "Serie",
    }

    it("should return a string, event if given type is undefined", () => {
      assert.deepEqual(getCategory(), "")
    })

    for (const cat in CATEGORIES) {
      const i = Object.keys(CATEGORIES).indexOf(cat)
      it(`should return a ${i} category ${cat} from given nibble1 value`,
        () => {
          assert.equal(getCategory(i), CATEGORIES[cat].toString())
        })
    }
  })
})
