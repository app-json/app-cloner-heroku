  "use strict"

var fs = require("fs")
var url = require("url")
var events = require("events")
var isURL = require("is-url")
var gh = require("github-url-to-object")
var superagent = require("superagent")
var flatten = require("flatten")
var redact = require("redact-url")
var ini = require("ini")
var auth = require("heroku-auth-finder")
var Heroku = require("heroku-client")

var Cloner = module.exports = (function() {

  function Cloner(options) {

    this.repo = options.repo
    this.token = options.token
    this.app = options.app

    if (!this.repo)
      throw new Error("repo is required")

    if (gh(this.repo))
      this.repo = gh(this.repo).tarball_url

    if (!isURL(this.repo))
      throw new Error("repo must be a URL")

    if (!this.token)
      this.token = auth()

    if (!this.token)
      throw new Error("token is required")

    this.payload = {
      source_blob: {
        url: this.repo
      }
    }

    if (this.app)
      this.payload.app = {name: app}

    this.client = Heroku.createClient({token: this.token})
  }

  Cloner.prototype = new events.EventEmitter

  Cloner.prototype.fail = function(err) {
    if (err.body && err.body.message) err = err.body.message
    this.emit("error", err)
  }

  Cloner.prototype.start = function(repo_url, app_name) {
    var _this = this
    var pollInterval
    var build

    this.emit("start", this.payload)

    var poll = function() {

      _this.client.get("/app-setups/" + build.id, function(err, b) {
        if (err) return _this.fail(err)
        build = b

        switch (build.status) {
          case "pending":
            _this.emit("pending")
            break
          case "failed":
            if (_this.done) return
            clearInterval(pollInterval)
             _this.fail(build.failure_message)
            _this.done = true
            break
          case "succeeded":
            if (_this.done) return
            clearInterval(pollInterval)
            _this.emit("succeeded", build)
            _this.done = true
            break
        }

      })
    }

    this.client.post("/app-setups/", this.payload, function(err, b) {
      if (err) return _this.fail(err)
      build = b
      _this.emit("create", build)
      pollInterval = setInterval(poll, 1000)
    })

  }

  Cloner.new = function(options) {
    return new Cloner(options)
  }

  return Cloner

})()
