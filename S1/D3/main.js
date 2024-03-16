const express= require("express")

const app=express()

app.use((req,res,next) =>{
    console.log("This is Miaddleware")
    res.send({"msg:":"This is a Middleware page"})
    next()
})

app.get("/" , (req,res) =>{
    console.log("Home Page")
    res.send({"msg:":"This is a home page"})
})

app.get("/about" , (req,res) =>{
    res.send({"msg:":"This is a about page"})
    console.log("About page")
})

app.listen(4545, () =>{
    console.log("Express is running at port 4545")
})