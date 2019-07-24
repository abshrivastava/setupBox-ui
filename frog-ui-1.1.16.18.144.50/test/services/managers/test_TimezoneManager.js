//
// Copyright (C) 2006-2016 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//
import assert from "assert"
import {stub} from "sinon"
import {describe} from "mocha"
import TimezoneManager from "services/managers/TimezoneManager"
import * as ConfigManager from "services/managers/config"
import * as TimezonesAPI from "services/api/timezone"
import * as DateUtils from "utils/date"

/** @test {TimezoneManager} */
describe("TimezoneManager", function() {
  describe("setDisplayH24 & isDisplayH24", () => {
    it("Should set attribute displayH24", () => {
      const stubTimeFormat = stub(ConfigManager, "setTimeFormat")
      stubTimeFormat.returns(Promise.resolve())

      TimezoneManager.displayH24 = true
      assert.equal(TimezoneManager.displayH24, true)
      TimezoneManager.displayH24 = false
      assert.equal(TimezoneManager.displayH24, false)

      stubTimeFormat.restore()
    })
  })

  describe("setCurrentTimezone & getCurrentTimezone", () => {
    it("Should get/set attribute timezone", () => {
      const tz = [{
        "timezone": -7200,
        "daylight": true,
        "name": "Europe/Oslo",
      }]
      const stubGetTz = stub(TimezonesAPI, "getTimezone")
      const stubSetTz = stub(TimezonesAPI, "setTimezone")

      stubGetTz.returns(Promise.resolve(tz))
      stubSetTz.returns(Promise.resolve())

      return TimezoneManager.setCurrentTimezone("Europe/Oslo")
        .then(() => {
          stubGetTz.restore()
          stubSetTz.restore()
          return assert.equal(TimezoneManager.current, "Europe/Oslo")
        })
    })
  })

  describe("getTimezones", () => {
    it("Should call getTimezones from api", () => {
      const tz = {
        "timezone": -50400,
        "daylight": false,
        "name": "Etc/GMT-14",
      }
      const tzs = {
        "timezones": [
          {
            "timezone": -50400,
            "daylight": false,
            "name": "Etc/GMT-14",
          },
          {
            "timezone": -50400,
            "daylight": false,
            "name": "Pacific/Kiritimati",
          },
        ],
      }
      const stubGetTzs = stub(TimezonesAPI, "getTimezones")
      const stubGetTz = stub(TimezonesAPI, "getTimezone")

      stubGetTzs.returns(Promise.resolve(tzs))
      stubGetTz.returns(Promise.resolve(tz))

      return TimezoneManager.getTimezones()
        .then(() => {
          stubGetTzs.restore()
          stubGetTz.restore()

          assert.equal(TimezoneManager.timezoneList.length, 2)
          return assert.equal(TimezoneManager.timezoneList[0].name, "Etc/GMT-14")
        })
    })
  })

  describe("getFormatTime", () => {
    it("Should call formatTime from date", () => {
      const stubFormatTime = stub(DateUtils, "formatTime").returns("12:30")
      assert.equal(TimezoneManager.getFormatTime(new Date()), "12:30")
      stubFormatTime.restore()
    })
  })

  describe("getEpgFormatTime - H12", () => {
    it("Should call transformTime from date", () => {
      const stubFormatTime = stub(DateUtils, "transformTime").returns("12:30")
      assert.equal(TimezoneManager.getEpgFormatTime(new Date()), "12:30")
      stubFormatTime.restore()
    })
  })
})
