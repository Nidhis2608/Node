// const {createServer}=require("http")
// // const {readFileSync}=require("fs")
// const {createReadStream, read}=require("fs")
// const fs=require("fs")

// createServer((req,res)=>{
//   if(req.url==='/data'){
//     const data=readFileSync("./db.json","utf-8")
//     res.end(data)
//   }
// }).listen(8080,()=>{
//     console.log("Server is running at port 8080")
// })



// createServer((req,res)=>{
//       if(req.url==='/data'){
//         const readableStream=createReadStream("./db.json")
//         let str=""
//         readableStream.on("data",(chunk)=>{
//           str+=chunk
//         })
//         readableStream.on("end",()=>{
//            res.end(str)
//         })
//       }
//     }).listen(8080,()=>{
//         console.log("Server is running at port 8080")
//     })




// const fs=require("fs")
// const readableStream=fs.createReadStream("./db.json")
// readableStream.on("data",(chunk)=>{
//     console.log(`the size of each chunk is ${chunk.length} Bytes`)
//     console.log(`received chunk:${chunk}`)
// })

// readableStream.on("end",()=>{
//     console.log("All the chunks have been received")
// })




// const fs=require("fs")
// const writableStraem=fs.createWriteStream("./text.txt")//file doesn't exist it will create automtaically
// writableStraem.write("Hello wold\n")
// writableStraem.end("Writing operation is ended now")




//PIPING
// const fs=require("fs")
// const readStream=fs.createReadStream("./db.json")
// const writeStream=fs.createWriteStream("./output.json")
// readStream.pipe(writeStream)



//CREATE A SERVER TO READ A VIDEO FILE AND STREAM IT ON THE BOWSER
// To get size of file we use stat from fs stat use callback to get them in promise we use promisify
const {createServer}=require("http")
const {stat, createReadStream}=require("fs")
const {promisify}=require("util")
const fileName="./video.mp4"
const fileInfo=promisify(stat)

createServer(async(req,res)=>{
    if(req.url==="/video"){
        const {size}= await fileInfo(fileName)
        const range=req.headers.range
        if(range){
          //I should have start and end in case of range 
          let [start,end]=range.replace(/bytes=/,"").split("-")
          start=parseInt(start,10)
          end=end?parseInt(end,10):size-1
         
          res.writeHead(206,{
            "Content-Type":"video/mp4",
            "Accept-Ranges":"bytes",
            "Content-Range":`bytes ${start}-${end}/${size}`
        })
        createReadStream(fileName,{start,end}).pipe(res)
        console.log(range)
        } else {
            res.writeHead(200,{
                "Content-Type":"video/mp4"
            })
        }
         //res.end("Video will be played here...")
         createReadStream(fileName).pipe(res)
    }
}).listen(8080,()=>{
    console.log("Server is runnig at port 8080")
})