const express=require("express")
const app=express()
const fs=require("fs")


app.get("/" , (req,res)=>{
    res.send({"msg":"This is the home page"})
})

app.get("/search", (req,res)=>{
    const {q}=req.query
    if(q){
        res.send({"msg":`This is the required result`, "result":q})
    } else {
        res.send({"msg":"This is the required result"})
    }
    
})

// app.get("/weather" , (req,res)=>{
//     fs.readFile("./db.json", (err,data)=>{
//         if(err)throw err ;
//         // console.log(data);
//         const {q}=req.query
//         const cities=JSON.parse(data).cities
//     if(q){
//         res.send({"msg":"This is the result", "result":res.temperature})
//     } else {
//         res.send({"msg":"This is the required result"})
//     }
//     });
// })

//QUERY
app.get("/weather" ,(req,res)=>{
    const {city}=req.query
    const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"))
    if(data[city]){
        res.send({"msg":`The weather at ${city} is ${data[city]} degree Celcius`})
    } else {
        res.send({"msg":"Please pass the city name as query"})
    }
})

app.get("/users" , (req,res) =>{
    const data=JSON.parse(fs.readFileSync("./db.json", "utf-8"))
    res.send({"users":data.users})
})

app.get("/users/:id", (req,res)=>{
    const {id}=req.params
    const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    const requiredUser=data.users.filter((ele) => {
        return ele.id == id
    })
    console.log(requiredUser)
    if(requiredUser.length>0){
        res.send({"msg":`Details of the user with ID:${id}`,"users":requiredUser})
    } else {
        res.send({"msg":`User doesn't exist with  ID:${id}`})

    }
})

app.delete("/users/:id", (req,res)=>{
  const {id}=req.params
  const data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
  const requiredUser=data.users.filter((ele) => {
    return ele.id != id
  })
  data.users=requiredUser
  fs.writeFileSync("./db.json",JSON.stringify(data))
  res.send({"msg":`The user with ID${id} has been deleted`})
})


app.listen(6500, ()=>{
    console.log("Server is running at port 6500")
})