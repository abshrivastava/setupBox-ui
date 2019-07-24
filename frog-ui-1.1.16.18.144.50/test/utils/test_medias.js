//
// Copyright (C) 2006-2016 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//

import assert from "assert"
import {describe} from "mocha"

import {formatPlayInfo} from "utils/medias"

/** @test {formatPlayInfo} */
describe("formatPlayInfo", () => {
  it("should return an empty string", () => {
    assert.equal(formatPlayInfo(), "")
  })

  const givenString = "foo /BAR with space/vid-2a.avi *wyplay.com_mp4"
  const expectedString = "foo%20/BAR%20with%20space/vid-2a.avi"

  it("should return an encoded string", () => {
    assert.equal(formatPlayInfo(givenString), expectedString)
  })
})
