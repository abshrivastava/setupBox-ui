//
// Copyright (C) 2006-2016 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//

import assert from "assert"
import {describe} from "mocha"
import {spy, stub} from "sinon"
import {
  noop,
  constructorOf,
  isObject,
  isArray,
  isFunction,
  isDefined,
  mod,
  throttle,
  debounce,
  createTicker,
  wait,
  pick,
  reverseObject,
  findKey,
  findWhere,
  findObjInArrayByValue,
  trace,
  traceCall,
  matchFilters,
} from "utils"

import "utils/polyfill"
import config from "utils/config"

/** @test {noop} */
describe("noop", () => {
  it("should return undefined", () => {
    assert.equal(noop(), undefined)
  })
})

/** @test {trace} */
describe("trace", () => {
  config.DEBUG = false
  class F {
    @trace
    f(log) {
      return Promise.resolve()
    }
  }

  const c = new F()
  const sTrace = spy(c,"f")
  it("should be called once", () => {
    return c.f().then(() => {
      return assert(sTrace.calledOnce)
    })
  })

  it("should be called with good arguments", () => {
    return c.f("log").then(() => {
      return assert(sTrace.calledWith("log"))
    })
  })

  it("should call console trace", () => {
    config.DEBUG = true
    const sCTrace = stub(console, "trace")
    class G {
      @trace
      g() {
        return Promise.resolve()
      }
    }
    const c = new G()
    return c.g().then(() => {
      sCTrace.restore()
      return assert(sCTrace.calledWith("%cG#g", "", []))
    })
  })
})

/** @test {traceCall} */
describe("traceCall", () => {
  it("should return undefined by default", () => {
    config.DEBUG = false
    assert.equal(traceCall("test"), undefined)
  })

  it("should take some predefined style", () => {
    const sCTrace = stub(console, "trace")
    config.DEBUG = true
    traceCall("Controller#")
    return Promise.resolve().then(() => {
      sCTrace.restore()
      return assert(sCTrace.calledWith("%cController#",
        "color: #28a140; font-weight: bold", []))
    })
  })
})

/** @test {constructorOf} */
describe("constructorOf", () => {
  function A() {}
  it("should return null if no arguments", () => {
    assert.equal(constructorOf(), null)
  })

  it("should return Object for objects literals", () => {
    assert.equal(constructorOf({}), Object)
  })

  it("shoud return Array for arrays literals", () => {
    assert.equal(constructorOf([]), Array)
  })

  it("should return String for strings literals", () => {
    assert.equal(constructorOf("foo"), String)
  })

  it("should return Number for numbers literals", () => {
    assert.equal(constructorOf(42), Number)
  })

  it("should return the constructor of an instance created with new", () => {
    assert.equal(constructorOf(new A()), A)
  })
})

/** @test {isObject} */
describe("isObject", () => {
  it("should return true for objects literals", () => {
    assert(isObject({}))
  })

  it("should return false for other types", () => {
    assert(!isObject([]))
  })
})

/** @test {isArray} */
describe("isArray", () => {
  it("should return true for arrays literals", () => {
    assert(isArray([]))
  })

  it("should return false for other types", () => {
    assert(!isArray({}))
  })
})

/** @test {isFunction} */
describe("isFunction", () => {
  it("should return true for function literals", () => {
    assert(isFunction(function() {}))
  })

  it("should return true for arrow function literals", () => {
    assert(isFunction(() => {}))
  })

  it("should return false for other types", () => {
    assert(!isFunction({}))
  })
})

/** @test {isDefined} */
describe("isDefined", () => {
  it("should return true for defined values", () => {
    assert(isDefined({}))
  })

  it("should return false for undefined values", () => {
    assert(!isDefined(undefined))
  })
})

/** @test {mod} */
describe("mod", () => {
  it("should have a weird behaviour with native operator on neagtive numbers",
    () => {
      assert.equal(-5 % 4, -1)
    })

  it("should compute the right modulo for negative numbers", () => {
    assert.equal(mod(-5, 4), 3)
  })
})

/** @test {throttle} */
describe("throttle", () => {
  const throttleSpy = spy()
  let throttled = throttle(throttleSpy, 100)

  it("should return a function", () => {
    assert(isFunction(throttled))
  })

  describe("throttled function", function() {
    throttled()
    throttled()

    it("should execute at least once in the given rate", () => {
      assert(throttleSpy.calledOnce)
    })

    it("should execute at most once in the given rate", (done) => {
      throttleSpy.reset()
      throttled = throttle(throttleSpy, 100)
      const interval = setInterval(throttled, 10)
      setTimeout(() => {
        clearInterval(interval)
        assert(throttleSpy.calledOnce)
        done()
      }, 110)
    })
  })
})

/** @test {debounce} */
describe("debounce", () => {
  const debounceSpy = spy()
  const debounced = debounce(debounceSpy, 100)

  it("should return a function", () => {
    assert(isFunction(debounced))
  })

  it("shouldn't be called before given timeout", (done) => {
    debounced()
    setTimeout(() => {
      assert(!debounceSpy.called)
      done()
    }, 50)
  })

  it("should be called when the delay is reached", (done) => {
    setTimeout(() => {
      assert.equal(debounceSpy.calledOnce, 1)
      done()
    }, 100)
  })
})

/** @test {createTicker} */
describe("createTicker", () => {

  describe("ticker api", () => {
    const ticker = createTicker(100)
    it("should create an object with a start method", () => {
      assert(isFunction(ticker.start))
    })

    it("should create an object with a stop method", () => {
      assert(isFunction(ticker.stop))
    })
  })

  describe("ticker.start", () => {

    const ticker = createTicker(100)
    const tickerSpy = spy()

    it("should start", (done) => {
      ticker.start(tickerSpy)
      done()
    })

    it("should mark the ticker as running", (done) => {
      assert(ticker.running)
      ticker.stop()
      tickerSpy.reset()
      done()
    })

    it("should call the cb at defined rate", (done) => {
      ticker.start(tickerSpy)
      setTimeout(() => {
        assert(tickerSpy.calledOnce)
      }, 50)
      setTimeout(() => {
        assert(tickerSpy.calledTwice)
        done()
      }, 150)
    })

    it("should be started twices without any effects", (done) => {
      assert.equal(ticker.start(tickerSpy), undefined)
      done()
    })

    it("should be delayed for the first invokation", () => {
      tickerSpy.reset()
      ticker.stop()
      ticker.start(tickerSpy, true)
      setTimeout(() => {
        assert.equal(tickerSpy.callCount, 0)
      }, 50)
      setTimeout(() => {
        assert(tickerSpy.calledOnce)
      }, 100)
    })

    it("can be stop twices without any effects", (done) => {
      ticker.stop()
      ticker.stop()
      done()
    })
  })

  describe("ticker.stop", () => {
    const ticker = createTicker(100)
    let counter = 0

    ticker.start(() => counter += 1)

    setTimeout(() => {
      ticker.stop()
      // At this point count should be == 2, we wait a little bit more to check
      // it's still 2

      setTimeout(() => {
        it("should stop execution of the function", () => {
          assert.equal(counter, 2)
        })

        it("should mark the ticker as stopped", () => {
          assert(!ticker.running)
        })
      }, 150)
    }, 150)
  })
})

/** @test {wait} */
describe("wait", () => {
  const before = new Date()

  it("should return a promise that is resolved after a given time", () => {
    wait(100).then(() => {
      const now = new Date()
      assert(now > before)
    })
  })
})

/** @test {pick} */
describe("pick", () => {
  const obj = {a: 1, b: 2, c: 3}
  const extracted = pick(obj, "a")

  it("should return an object", () => {
    assert(isObject(extracted))
  })

  it("should copy the given properties from the source object", () => {
    assert.equal(extracted.a, 1)
  })

  it("should remove the copied properties from the source", () => {
    assert(!obj.hasOwnProperty("a"))
  })
})

/** @test {reverseObject} */
describe("reverseObject", () => {
  const obj = {a: 1, b: 2}
  const reversed = reverseObject(obj)

  it("should return an array", () => {
    assert(isArray(reversed))
  })

  it("should have one item for each key in the source object", () => {
    assert.equal(reversed.length, 2)
  })

  it("values are used as the first element of each item", () => {
    assert.equal(reversed[0][0], 1)
  })

  it("keys are used as the second element of each item", () => {
    assert.equal(reversed[0][1], "a")
  })
})

/** @test {findKey} */
describe("findKey", () => {
  const obj = {a: 1, b: [1, 2, 3]}
  it("returns the key associated with a value in an object", () => {
    assert.equal(findKey(obj, 1), "a")
  })

  it("returns the key associated with a value in an object", () => {
    assert.equal(findKey(obj, [1, 2, 3]), "b")
  })

  it("returns null if the value is not found", () => {
    assert.equal(findKey(obj, 2), null)
  })

  it("uses strict equality to compare values", () => {
    assert.equal(findKey(obj, "1"), null)
  })
})

/** @test {findWhere} */
describe("findWhere", () => {
  const obj = [{id: 1, name: "test_1"}, {id: 2, name: "test_1"}, {id: 3, name: "test_1"}, {id: 4, name: "test_1"}]

  it("returns the object associated with a given criteria in an object", () => {
    assert.deepEqual(findWhere(obj, {id: 1}), {id: 1, name: "test_1"})
  })

  it("returns undefined if the value is not found", () => {
    assert.equal(findWhere(obj, {id: 5}), undefined)
  })
})

/** @test {findObjInArrayByValue} */
describe("findObjInArrayByValue", () => {
  const obj = [{id: 1, name: "test_1"}, {id: 2, name: "test_1"}, {id: 3, name: "test_1"}, {id: 4, name: "test_1"}]

  it("Returns the objet associated with a given value in an array of object", () => {
    assert.deepEqual(findObjInArrayByValue(obj, 1), {id: 1, name: "test_1"})
  })

  it("returns null if the value is not found", () => {
    assert.equal(findObjInArrayByValue(obj, {id: 5}), null)
  })
})

/** @test {matchFilters} */
describe("matchFilters", () => {

  it("Returns false if data can't match filters", () => {
    assert(!matchFilters({universe: "test"}, {}))
    assert(!matchFilters({universe: "test"}, ""))
    assert(!matchFilters({universe: "test"}, {universe: {key: "value"}}))
    assert(!matchFilters({universe: "test"}, {universe: "foo"}))
    assert(!matchFilters({"universe": ["foo", "bar"]}, {universe: "test"}))
    assert(!matchFilters({"universe": () => {
      return true
    }}, {key: "value"}))
  })

  it("Returns True if the filter's function matches w/ data", () => {
    const filters = {"universe": () => {
      return true
    }}
    assert(matchFilters(filters, {universe: "tv"}))
    assert(matchFilters(filters, {universe: "loo"}))
    assert(matchFilters(filters, {universe: {key: "value"}}))
  })

  it("Returns True if filter is equal to given data", () => {
    const filters = {"universe": "tv"}
    assert(matchFilters(filters, {universe: "tv"}))
  })

  it("Returns True if filter contains filter(s)", () => {
    const filters = {"universe": {"key": "value"}}
    assert(matchFilters(filters, {universe: {"key": "value"}}))
  })

  it("Returns True if data matches at least one of the given values in filter", () => {
    const filters = {"universe": ["foo", "bar"]}
    assert(matchFilters(filters, {universe: "foo"}))
  })
})
