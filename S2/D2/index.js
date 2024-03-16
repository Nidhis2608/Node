const express = require("express");
// const mongoose=require("mongoose")
const { connection, UserModel } = require("./config/db");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "This is the home page" });
});

app.post("/users", async (req, res) => {
  const payload = req.body;
  try {
    ///new instatnce of usermodel for insert one user
    const user = new UserModel(payload);
    await user.save();
    res.status(200).send({ msg: "The new user has been registered" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

app.get("/users", async (req, res) => {
    const {page}=req.query
    const limitValue=10
    const skipValue=(page*limitValue)-limitValue
  try {
    console.log(page)
    if(page){
        const users = await UserModel.find().skip(skipValue).limit(limitValue);
        res.status(200).send({ msg: `Details of all the users on Page number:${page}`, users });
    } else{
        const users = await UserModel.find()
        res.status(200).send({ msg: "Details of all the users", users });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

//API to get the user by id
app.get("/users/:userID",async(req,res)=>{
    const {userID}=req.params
    try{
    const user=await UserModel.find({_id:userID})
    res.status(200).send(user)
    }
    catch(err){
   res.status(400).send({"error":err})
    }
})

app.patch("/users/:userID",async(req,res)=>{
  const {userID}=req.params
  const updatepayload=req.body
  try{
    await UserModel.findByIdAndUpdate({_id:userID},updatepayload)
    res.status(200).send({"msg":`The user with ID:${userID} has been updated`})
  }
  catch(err){
   res.status(400).send({"error":err})
  }
})

app.delete("/users/:userID",async(req,res)=>{
    const {userID}=req.params
    // const updatepayload=req.body
    try{
      await UserModel.findByIdAndDelete({_id:userID})
      res.status(200).send({"msg":`The user with ID:${userID} has been deleted`})
    }
    catch(err){
     res.status(400).send({"error":err})
    }
  })

app.listen(8080, async () => {
  try {
    await connection
    console.log("Connected to the DB");
    console.log("Server is running at port 8080");
  } catch (err) {
    console.log(err);
  }
});