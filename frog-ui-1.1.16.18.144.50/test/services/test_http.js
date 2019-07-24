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
import xhrMock from "xhr-mock"
import {
  okJSON,
  MockEventSource,
} from "test/helper"
import {
  sse,
  GET,
  POST,
  PUT,
  DELETE,
  createQueryString,
  formUrlencoded,
} from "services/http"
import config from "utils/config"
import appConfig from "app/config"
import {noop} from "utils"

global.EventSource = MockEventSource

/** @test {sse} */
describe("sse", ()  => {
  sse.connect()

  describe("on", st => {
    const onSimple = () => {
      it("should add event handlers to be called on given events", noop)
    }
    sse.on("simple", onSimple)
    sse.eventSource.emit("simple")
    sse.off("simple", onSimple)

    const onWithData = (data) => {
      it("should automatically parse received JSON", () => {
        assert.equal(data.foo, "bar")
      })
    }
    sse.on("withData", onWithData)
    sse.eventSource.emit("withData", {foo: "bar"})
    sse.off("withData", onWithData)
  })

})

describe("http", () => {
  config.STB_IP = "test"

  describe("URL conversion", st => {
    xhrMock.setup()


    xhrMock.get("http://test/foo", (request, response) => {
      it("shoud automatically add the full STB URL to requests starting " +
        " with a /", () => {
          assert(request.url(), "http://test/foo")
        })
      return okJSON(response, {})
    })

    xhrMock.get("http://example.com", (request, response) => {
      it("shouldn't change fully qualified URLs", () => {
        assert.equal(request.url(), "http://example.com")
      })
      return okJSON(response, {})
    })

    Promise.all([
      GET("/foo"),
      GET("http://example.com"),
    ]).then(xhrMock.teardown).catch(noop)
  })

  describe("GET a JSON resource", () => {

    const expected = {foo: "bar"}

    xhrMock.get("http://test/foo", (_, res) => okJSON(res, expected))

    GET("/foo").then(response => {
      it("should automatically decodes JSON responses", () => {
        assert.equal(response.foo, expected.foo)
      })
      xhrMock.teardown()
    }).catch(noop)
  })

  describe("POST", () => {
    xhrMock.setup()

    const payload = {foo: "bar"}

    xhrMock.post("http://test/", (request, response) => {
      it("should automatically encode JSON payloads", () => {
        assert.equal(request.body(), JSON.stringify(payload))
      })
    })

    POST("/", payload).then(response => {
      xhrMock.teardown()
    }).catch(noop)
  })

  describe("createQueryString", () => {
    const cases = [
      {
        message: "creates a query string from an object",
        input: {foo: "bar"},
        output: "?foo=bar",
      },
      {
        message: "use url-encoding on keys and values",
        input: {":foo:": "?bar?"},
        output: "?%3Afoo%3A=%3Fbar%3F",
      },
    ]

    for (const c of cases) {
      it(c.message, () => {
        assert.equal(createQueryString(c.input), c.output)
      })
    }
  })

  describe("formUrlencoded", () => {
    const cases = [
      {
        message: "returns a list of key=values separated with &",
        input: {foo: "bar", baz: "quux"},
        output: "foo=bar&baz=quux",
      },
      {
        message: "use url-encoding on keys",
        input: {":": "bar"},
        output: "%3A=bar",
      },
      {
        message: "use url-encoding on values",
        input: {"foo": ":"},
        output: "foo=%3A",
      },
    ]

    for (const c of cases) {
      it(c.message, () => {
        assert.equal(formUrlencoded(c.input), c.output)
      })
    }
  })
})
