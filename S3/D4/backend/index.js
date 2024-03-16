const express=require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.routes")


const app=express()
app.use(express.json())
app.use("/users",userRouter)



const server = app.listen(3000,async()=>{
    try{
        await connection
        console.log("Connected to DB")
        console.log("Running at port 3000")
    }
    catch(err){
       console.log(err)
    }
})

module.exports={
    server
}