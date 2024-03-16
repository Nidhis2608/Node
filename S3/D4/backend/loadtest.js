// const autocannon=require("autocannon")

// const instance=autocannon({
//     url: "http://localhost:8080/users",
//     connections: 10,
//     pipeline: 1,
//     duration:10
// })


// instance.on("done", ()=>{
//     console.log("Load testing completed")
//     console.log("Request per second:",instance.stats.request)
//     console.log("Latency Average:",instance.stats.latency.avg)
//     console.log("Maximum Latency:",instance.stats.latency.max)
// })

// instance.run()

const autocannon = require('autocannon')

autocannon({
  url: 'http://localhost:8080/users',
  connections: 10, //default
  pipelining: 1, // default
  duration: 10 // default
}, console.log)

// async/await
async function foo () {
  const result = await autocannon({
    url: 'http://localhost:8080/users',
    connections: 10, //default
    pipelining: 1, // default
    duration: 10 // default
  })
  console.log(result)
}