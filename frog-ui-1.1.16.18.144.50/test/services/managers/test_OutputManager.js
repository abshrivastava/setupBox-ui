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
import {MockEventSource} from "test/helper"
import ManagerOutput from "services/managers/OutputManager"
import * as OutputAPI from "services/api/output"
import * as ConfigManager from "services/managers/config"

global.EventSource = MockEventSource

/** @test {OutputManager} */
describe("OutputManager", function() {
  const OutputManager = new ManagerOutput()
  let getOutputStub
  let setResolutionStub
  let setAspectRatioStub
  let stubSetResolution
  let hdmiResponse = {
    "status": true,
    "sdtv_encoding": -1,
    "audio_gain": 0,
    "hdmi_connection_plugged": true,
    "active_portion": "avio_hdmi_ap_cframe",
    "format": "1280x720@50p",
    "hdmi_prefered_format": "1920x1080@60p",
    "hdmi_supported_formats": [
      "640x480@59p",
      "720x480@60i",
      "720x576@50i",
      "720x582@50i",
      "720x576@60i",
      "720x480@60p",
      "720x576@50p",
      "1920x1080@50i",
      "1920x1080@24p",
      "1920x1080@25p",
      "1920x1080@30p",
      "1920x1080@50p",
      "1920x1080@60p",
      "3840x2160@60p",
      "5120x2160@60p",
      "4096x2160@60p",
      "1280x720@50p",
    ],
    "audio_mode": "avio_audio_mode_stereo_downmix",
    "audio_capabilities": 2,
    "aspect_ratio": "avio_aspect_ratio_16_9",
    "model": "T23B350",
    "manufacturer": "",
  }

  const analogResponse = {
    "status": true,
    "sdtv_encoding": "avio_sdtv_enc_pal",
    "audio_gain": 0,
    "video_mode": 2,
    "format": "720x576@50i",
    "wss": "avio_wss_4_3_full",
    "rgb_gain": -1,
    "aspect_ratio": "avio_aspect_ratio_4_3",
    "displayed_area": [
      0,
      0,
      1,
      1,
    ],
  }

  beforeEach(function() {
    stubSetResolution = stub(ConfigManager, "setResolution").returns(Promise.resolve())
    getOutputStub = stub(OutputAPI, "getData")
    getOutputStub.withArgs("avio_output_hdmi0").returns(Promise.resolve(hdmiResponse))
    getOutputStub.withArgs("avio_output_videoanalog0").returns(Promise.resolve(analogResponse))

    setResolutionStub = stub(OutputAPI, "setResolution")
    setResolutionStub.withArgs("avio_output_hdmi0").returns(Promise.resolve())
    setResolutionStub.withArgs("avio_output_videoanalog0").returns(Promise.resolve())

    setAspectRatioStub = stub(OutputAPI, "setAspectRatio")
    setAspectRatioStub.withArgs("avio_output_hdmi0").returns(Promise.resolve())
    setAspectRatioStub.withArgs("avio_output_videoanalog0").returns(Promise.resolve())
  })

  afterEach(function() {
    stubSetResolution.restore()
    getOutputStub.restore()
    setResolutionStub.restore()
    setAspectRatioStub.restore()
  })

  describe("setDevice", () => {
    it("the attribute `device` should be updated", () => {
      OutputManager.setDevice("hdmi")
      assert.equal(OutputManager.device, "hdmi")
    })
  })

  describe("fetchData", () => {
    it("it should return the HDMI resolutions in the specified range", () => {
      return OutputManager.fetchData("hdmi")
        .then(() => {
          assert.deepEqual(OutputManager.resolutionList, [
            "720x480@60i",
            "720x576@50i",
            "720x582@50i",
            "720x576@60i",
            "720x480@60p",
            "720x576@50p",
            "1920x1080@50i",
            "1920x1080@24p",
            "1920x1080@25p",
            "1920x1080@30p",
            "1920x1080@50p",
            "1920x1080@60p",
            "1280x720@50p",
          ])
          assert.equal(OutputManager.tmpResolution, "1280x720@50p")
          assert.equal(OutputManager.aspectRatio, "16/9")
          assert.equal(OutputManager.hdmiPreferedResolution, "1920x1080@60p")
        })
    })
    it("it should return the ANALOG resolutions", () => {
      return OutputManager.fetchData("analog")
        .then(() => {
          assert.deepEqual(OutputManager.resolutionList, [])
          assert.equal(OutputManager.tmpResolution, "720x576@50i")
          assert.equal(OutputManager.aspectRatio, "4/3")
          assert.equal(OutputManager.hdmiPreferedResolution, null)
        })
    })
  })

  describe("getResolution", () => {
    it("it should return the current HDMI resolution", () => {
      return OutputManager.fetchData("hdmi")
        .then(() => {
          return assert.equal(OutputManager.tmpResolution, "1280x720@50p")
        })
    })
    it("it should return the current ANALOG resolution", () => {
      return OutputManager.fetchData("analog")
        .then(() => {
          return assert.equal(OutputManager.tmpResolution, "720x576@50i")
        })
    })
  })

  describe("getAspectRatio", () => {
    it("it should return the current HDMI Aspect Ratio", () => {
      return OutputManager.fetchData("hdmi")
        .then(() => {
          OutputManager.getAspectRatio("hdmi")
          return assert.equal(OutputManager.aspectRatio, "16/9")
        })
    })
    it("it should return the current ANALOG Aspect Ratio", () => {
      return OutputManager.fetchData("analog")
        .then(() => {
          OutputManager.getAspectRatio("analog")
          return assert.equal(OutputManager.aspectRatio, "4/3")
        })
    })
  })

  describe("setAspectRatio", () => {
    it("it should set the current HDMI Aspect Ratio", () => {
      return OutputManager.fetchData("hdmi")
        .then(() => {
          return OutputManager.setAspectRatio("hdmi", "4/3")
        })
        .then(() => {
          return assert.equal(OutputManager.aspectRatio, "4/3")
        })
        .then(() => {
          return OutputManager.setAspectRatio("hdmi", "16/9")
        })
        .then(() => {
          return assert.equal(OutputManager.aspectRatio, "16/9")
        })
    })
    it("it should set the current ANALOG Aspect Ratio", () => {
      return OutputManager.fetchData("analog")
        .then(() => {
          return OutputManager.setAspectRatio("analog", "4/3")
        })
        .then(() => {
          return assert.equal(OutputManager.aspectRatio, "4/3")
        })
        .then(() => {
          return OutputManager.setAspectRatio("analog", "16/9")
        })
        .then(() => {
          return assert.equal(OutputManager.aspectRatio, "16/9")
        })
    })
  })

  describe("setResolution", () => {
    describe("success", () => {
      it("the attribute `resolution` should be updated to the wanted resolution", () => {
        return OutputManager.fetchData("hdmi")
          .then(() => {
            return OutputManager.setResolution("hdmi", "1920x1080@24p")
          })
          .then(() => {
            return assert.equal(OutputManager.resolution, "1920x1080@24p")
          })
      })
    })

    describe("fallback", () => {
      it("the attribute `resolution` should be updated to the fallback resolution " +
          "if it's not in resolution list", () => {
        return OutputManager.fetchData("hdmi")
          .then(() => {
            return OutputManager.setResolution("hdmi", "4000x9000@60p")
          })
          .then(() => {
            return assert.equal(OutputManager.resolution, "1280x720@50p")
          })
      })
      describe("Empty EDID", () => {
        before(function() {
          hdmiResponse = {
            "hdmi_supported_formats": [],
          }
          getOutputStub.withArgs("avio_output_hdmi0").returns(Promise.resolve(hdmiResponse))
        })
        after(function() {
          getOutputStub.restore()
        })

        it("the attribute `resolution` should be updated to the fallback resolution " +
            "if it's not in resolution list and the EDID raise no resolution", () => {
          return OutputManager.fetchData("hdmi")
            .then(() => {
              return OutputManager.setResolution("hdmi", "1280x720@60p")
            })
            .then(() => {
              return assert.equal(OutputManager.resolution, "1280x720@50p")
            })
        })
      })
      describe("Setted Resolution is not in the list anymore", () => {
        before(function() {
          hdmiResponse = {
            "format": "1280x720@60p",
            "hdmi_prefered_format": "1920x1080@60p",
            "hdmi_supported_formats": [
              "640x480@59p",
              "720x480@60i",
              "1920x1080@50i",
              "1280x720@50p",
            ],
          }
          getOutputStub.withArgs("avio_output_hdmi0").returns(Promise.resolve(hdmiResponse))
        })
        after(function() {
          getOutputStub.restore()
        })

        it("the attribute `resolution` should be updated to the fallback resolution " +
            "if it's not in resolution list and Default Resolution is no more in the list", () => {
          return OutputManager.fetchData("hdmi")
            .then(() => {
              return OutputManager.setResolution("hdmi", "1280x720@60p")
            })
            .then(() => {
              return assert.equal(OutputManager.resolution, "1280x720@50p")
            })
        })
      })
      describe("720p50 is not supported", () => {
        before(function() {
          hdmiResponse = {
            "hdmi_supported_formats": [
              "640x480@59p",
              "720x480@60i",
              "1920x1080@50i",
              "1280x720@60p",
            ],
          }
          getOutputStub.withArgs("avio_output_hdmi0").returns(Promise.resolve(hdmiResponse))
        })
        after(function() {
          getOutputStub.restore()
        })

        it("the attribute `resolution` should be updated to the fallback resolution", () => {
          return OutputManager.fetchData("hdmi")
            .then(() => {
              return OutputManager.setResolution("hdmi", "1920x1080@60p")
            })
            .then(() => {
              return assert.equal(OutputManager.resolution, "1280x720@60p")
            })
        })
      })
    })
  })
})
