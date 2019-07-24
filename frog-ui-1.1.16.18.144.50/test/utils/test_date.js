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
  UPNP_DELTA,
  addHours,
  addMinutes,
  unixToUpnp,
  upnpToUnix,
  dateToCdsTimestamp,
  cdsTimestampToDate,
  formatDate,
  formatTime,
  formatDuration,
  toDayString,
  toDateString,
  toString,
  exists,
} from "utils/date"

describe("addHours", () => {
  const before = new Date(0)
  it("should update hours", () => {
    assert.deepEqual(addHours(before, 1), new Date(3600000))
  })
})

describe("addMinutes", () => {
  const before = new Date(0)
  it("should update minutes", () => {
    assert.deepEqual(addMinutes(before, 1), new Date(60000))

  })
})

describe("unixToUpnp", () => {
  it("should return UPNP timestamp of given UNIX timestamp", () => {
    assert.equal(unixToUpnp(0), UPNP_DELTA)
  })
})

describe("upnpToUnix", () => {
  it("should return UNIX timestamp of given UPNP timestamp", () => {
    assert.equal(upnpToUnix(UPNP_DELTA), 0)
  })
})

describe("dateToCdsTimestamp", () => {
  it("should return the NTP timestamp of the given date in seconds", () => {
    assert.equal(dateToCdsTimestamp(3600), 2208988803)
  })
})

describe("cdsTimestampToDate", () => {
  it("should return the Date object of the given NTP timestamp", () => {
    assert.deepEqual(cdsTimestampToDate(0),
      new Date("Mon Jan 01 1900 01:00:00 GMT+0100 (CET)"))
  })
})

describe("formatDate", () => {
  it("should return a formatted string (D M DN Y) of given Date object", () => {
    assert.equal(formatDate(new Date(0)), "Thu January 1st 1970")
  })

  it("should return undefined with undefined or null object as argument",
    () => {
      assert.equal(formatDate(undefined), undefined)
      assert.equal(formatDate(null), undefined)
    })
})

describe("formatTime", () => {
  it("should return a formatted string (H:M) of given Date object", () => {
    assert.equal(formatTime(new Date(3600000)), "02:00")
  })
  it("Should return 00:30", () => {
    const date = new Date(123377400000)
    assert.equal(formatTime(date), "00:30")
  })
  it("Should return 08:30", () => {
    const date = new Date(123406200000)
    assert.equal(formatTime(date), "08:30")
  })
  it("Should return 12:30", () => {
    const date = new Date(123420600000)
    assert.equal(formatTime(date), "12:30")
  })
  it("Should return 15:30", () => {
    const date = new Date(123431400000)
    assert.equal(formatTime(date), "15:30")
  })
  it("Should return 12:30am", () => {
    const date = new Date(123377400000)
    assert.equal(formatTime(date, false), "12:30am")
  })
  it("Should return 08:30am", () => {
    const date = new Date(123406200000)
    assert.equal(formatTime(date, false), "08:30am")
  })
  it("Should return 12:30pm", () => {
    const date = new Date(123420600000)
    assert.equal(formatTime(date, false), "12:30pm")
  })
  it("Should return 03:30pm", () => {
    const date = new Date(123431400000)
    assert.equal(formatTime(date, false), "3:30pm")
  })
  it("should return an empty string with undefined or null object", () => {
    assert.equal(formatTime(undefined), "")
    assert.equal(formatTime(null), "")
  })
})
describe("formatDuration", () => {
  it("should return a formatted string (XXmin) of given duration in minutes",
    () => {
      assert.equal(formatDuration(3600), "60min")
    })

  it("should return a formatted string (XXs) of given duration in minutes",
    () => {
      assert.equal(formatDuration(30), "30s")
    })

  it("should return a formatted string (xxmin) of given duration in minutes",
    () => {
      assert.equal(formatDuration(90), "1min")
    })
  it("should return \"unknown duration\" if given duration is not a number " +
    "or duration < 0",
    () => {
      assert.throws(() => formatDuration(-1), /invalid duration/)
      assert.throws(() => formatDuration("abc"), /invalid duration/)
      assert.throws(() => formatDuration({}), /invalid duration/)
      assert.throws(() => formatDuration([]), /invalid duration/)
    })
})

describe("toDayString", () => {
  const DAY = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]
  it("should return an empty string if given date is null or undefined", () => {
    assert.throws(() => toDayString(null), /invalid date/)
    assert.throws(() => toDayString(undefined), /invalid date/)
    assert.throws(() => toDayString({}), /invalid date/)
    assert.throws(() => toDayString([]), /invalid date/)
  })
  for (let i=0; i<DAY.length - 1; i++) {
    it(`should return ${DAY[i]}`, () => {
      const date = new Date("2016-08-22")
      date.setDate(date.getDate() + i)
      assert.equal(toDayString(date), DAY[i])
    })
  }
})

describe("toDateString", () => {
  const MONTH = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  it("should return an empty string if given date is null or undefined", () => {
    assert.throws(() => toDateString(null), /invalid date/)
    assert.throws(() => toDateString(undefined), /invalid date/)
    assert.throws(() => toDateString({}), /invalid date/)
    assert.throws(() => toDateString([]), /invalid date/)
  })
  for (let i=0; i<MONTH.length - 1; i++) {
    it(`should return ${MONTH[i]} 1st`, () => {
      const date = new Date("2016-01-01")
      date.setMonth(date.getMonth() + i)
      assert.equal(toDateString(date), MONTH[i] + " 1st")
    })
  }

  it("should return December 1st", () => {
    const date = new Date("2016-12-01")
    assert.equal(toDateString(date), "December 1st")
  })

  it("should return December 2nd", () => {
    const date = new Date("2016-12-02")
    assert.equal(toDateString(date), "December 2nd")
  })

  it("should return December 3rd", () => {
    const date = new Date("2016-12-03")
    assert.equal(toDateString(date), "December 3rd")
  })

  it("should return December 4th", () => {
    const date = new Date("2016-12-04")
    assert.equal(toDateString(date), "December 4th")
  })

  it("should return December 24th", () => {
    const date = new Date("2016-12-24")
    assert.equal(toDateString(date), "December 24th")
  })
})

describe("toString", () => {
  it("should return a date as a complete string", () => {
    assert.equal(toString(new Date(0)), "Thursday, January 1st")
  })

  it("should return an empty string if given date is null or undefined", () => {
    assert.equal(toString(null), "")
    assert.equal(toString(undefined), "")
    assert.equal(toString({}), "")
    assert.equal(toString([]), "")
  })
})

describe("exists", () => {
  it("should return false if wrong arguments", () => {
    assert.equal(exists(), false)
    assert.equal(exists({}), false)
    assert.equal(exists(0,[]), false)
    assert.equal(exists(0,1,null), false)
    assert.equal(exists(1,"a",-1), false)
    assert.equal(exists(1,1,-1), false)
  })

  it("should return false if wrong date", () => {
    assert.equal(exists(2016,1,30), false)
    assert.equal(exists(-1,-1,-1), false)
    assert.equal(exists(2016,1,-1), false)
    assert.equal(exists(1,1,-1), false)
  })
})
