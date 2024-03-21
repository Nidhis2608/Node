//Create an API endpoint to send email to a particular 
//email id that is being passed along with the subject and text

const express=require("express")
const {sendMail}=require("./sendEmail")
const app=express()
app.use(express.json())


app.get("/",(req,res)=>{
    res.send({"msg":"This is the home page"})
})

app.post("/sendmail",(req,res)=>{
    const {email}=req.body
    sendMail("nidhi12@gmail.com",email, "Express mail", "Sending through express")
    res.send({"msg":"Express has been used for sending email"})
})


app.listen(8080,()=>{
    console.log("Server is runnig at port 8080")
})