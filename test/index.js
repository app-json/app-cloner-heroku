"use strict"

require("dotenv").load()
var assert = require("assert")
var Cloner = require("..")
var cloner
var options

describe("Cloner", function() {

  beforeEach(function(){
    options = {
      repo: "zeke/slideshow",
      token: process.env.HEROKU_OAUTH_SECRET
    }
    cloner = new Cloner(options)
  })

  describe("instantiation", function(){

    it("has a repo", function() {
      assert(cloner.repo)
    })

    it("turns repo into a tarball URL", function() {
      assert.equal(cloner.repo, "https://api.github.com/repos/zeke/slideshow/tarball")
    })

    it("has a token", function() {
      assert.equal(cloner.token, process.env.HEROKU_OAUTH_SECRET)
    })

    it("creates a Heroku client", function() {
      assert(cloner.client)
    })

    it("has a payload getter", function() {
      assert(cloner.payload)
    })

    it("throws an error if repo is not specified", function(){
      assert.throws(
        function(){
          delete(options.repo)
          new Cloner(options)
        }
      )
    })

    it("derives token from env or netrc if not specified", function(){
      delete(options.token)
      cloner = new Cloner(options)
      assert(cloner.token)
    })

  })

  describe("events", function(){

    it("start", function(done){
      cloner.on("error", function(error){
        console.error(error)
      })

      cloner.on("start", function(){
        done()
      })

      cloner.start()
    })

  })

})
