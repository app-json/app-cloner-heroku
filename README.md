# app-cloner-heroku 

A node module for deploying app.json apps to Heroku. Designed to work on the server, the browser, and the command line.

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install app-cloner-heroku --save
```

## Usage

```js
var cloner = require("app-cloner-heroku").new({
  repo: "zeke/slideshow#master",
  token: process.env.HEROKU_OAUTH_SECRET,
  app: "my-new-slideshow"
})

cloner.on("create", function(build){
  console.log(build)
})

cloner.on("pending", function(){
  console.log(".")
})

cloner.on("succeeded", function(build){
  console.log(build)
})

cloner.on("error", function(error){
  console.error(error)
})

cloner.start()

```

## Tests

```sh
npm install
npm test
```

## Dependencies

- [dotenv](git://github.com/scottmotte/dotenv.git): Loads environment variables from .env
- [flatten](git://github.com/jesusabdullah/node-flatten.git): Flatten arbitrarily nested arrays into a non-nested list of non-array items
- [github-url-to-object](https://github.com/zeke/github-url-to-object): Extract user, repo, and other interesting properties from GitHub URLs
- [heroku-auth-finder](https://github.com/heroku/heroku-auth-finder): Derive a Heroku API key from process.env or ~/.netrc
- [heroku-client](https://github.com/jclem/node-heroku-client): A wrapper for the Heroku v3 API
- [ini](git://github.com/isaacs/ini.git): An ini encoder/decoder for node
- [is-url](https://github.com/segmentio/is-url): Check whether a string is a URL.
- [redact-url](https://github.com/zeke/redact-url): Redact or remove authentication data from URLs
- [superagent](git://github.com/visionmedia/superagent.git): elegant &amp; feature rich browser / node HTTP with a fluent API


## Dev Dependencies

- [mocha](git://github.com/visionmedia/mocha.git): simple, flexible, fun test framework


## License

MIT

## Colophon

- Homepage: https://github.com/app-json/app-cloner-heroku
- Author: zeke
- README generated by
[package-json-to-readme](https://github.com/zeke/package-json-to-readme)
