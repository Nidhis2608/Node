const express = require('express')
const {connection} = require("./config/db")
const {auth}=require("./middleware/auth.middleware")
const jwt=require("jsonwebtoken")
const {userRouter}=require("./routes/user.routes")
const app = express() 
app.use(express.json())
app.use("/users",userRouter)


app.get("/",(req,res)=>{
    res.json({msg:"Home page"})
})

app.get("/about",(req,res)=>{
    res.json({msg:"About page"})
})

//restricted routes
// app.get("/movies",(req,res)=>{
//     const {token}=req.headers.authorization
//     if(token==="abc123"){
//         res.json({msg:"Movies Data"})
//     } else {
//         res.json({msg:"You are not authorised"})
//     }
// })

app.get("/movies",auth ,(req,res)=>{
    res.json({msg:"Movies Data"})
})

app.get("/series",auth ,(req,res)=>{
    res.json({msg:"Series Data"})
})


// app.get("/series",(req,res)=>{
//     const {token}=req.headers.authorization
//     if(token){
//         jwt.verify(token,"masai",(err,decoded)=>{
//             if(decoded){
//                 console.log(decoded)
//                 res.json({msg:"Series Data"})
//             }
//         })
//     } else {
//         res.json({msg:"You are not authorised"})
//     }
    
// })


app.listen(8080,async()=>{
  try{
    await connection
    console.log("Connected to the DB")
    console.log("Server is running at port 8080")
  }
  catch(err){
    console.log(err)
  }
})