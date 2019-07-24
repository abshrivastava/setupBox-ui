//
// Copyright (C) 2006-2016 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//
import assert from "assert"
import {describe} from "mocha"
import AppsManager from "services/managers/AppsManager"

/** @test {ChannelManager} */
describe("AppsManager", function() {
  before(() => {
    this.json = {
      "categories":[
        {
          "applications":[{
            "label":"Maze",
            "position": 2,
          }, {
            "label":"Tetris",
            "position": 1,
          }],
          "position":2,
          "label":"Other games",
        },{
          "applications":[{
            "label":"Hextris",
            "position": 2,
          }, {
            "label":"PacMan",
            "position": 1,
          }],
          "position":1,
          "label":"Premium games",
        },
      ],
    }

    AppsManager.fillManager(this.json)
  })

  describe("fillManager", () => {
    it("should create categories from json", () => {
      assert.equal(AppsManager.getCategories().length, 2)
      assert.equal(AppsManager.getCategories()[0].position, 1)
      assert.equal(AppsManager.getCategories()[0].title, "Premium games")
      assert.equal(AppsManager.getCategories()[1].position, 2)
      assert.equal(AppsManager.getCategories()[1].title, "Other games")
    })
    it("categories should have applications", () => {
      assert.equal(AppsManager.getCategories()[0].getApplications().length, 2)
      assert.equal(AppsManager.getCategories()[0].getApplications()[0].title, "PacMan")
      assert.equal(AppsManager.getCategories()[0].getApplications()[1].title, "Hextris")
      assert.equal(AppsManager.getCategories()[1].getApplications().length, 2)
      assert.equal(AppsManager.getCategories()[1].getApplications()[0].title, "Tetris")
      assert.equal(AppsManager.getCategories()[1].getApplications()[1].title, "Maze")
    })
  })

  describe("getCategory", () => {
    it("Should return the correct category", () => {
      assert.equal(AppsManager.getCategory(0).title, "Premium games")
      assert.equal(AppsManager.getCategory(1).title, "Other games")
    })
  })
})
