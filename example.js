var cloner = require("./").new({
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
