const express=require("express")
const {UserModel}=require("../model/user.model")
const {limiter}=require("../middleware/rateLimit.middleware")

const userRouter=express.Router();

userRouter.get("/",limiter, async(req,res)=>{
    try{
      const users= await UserModel.find()
      res.status(200).send(users)
    }
    catch(err){
       res.status(400).send({err})
    }
})

userRouter.get("/:userID",async(req,res)=>{
    const {userID}=req.params
    try{
     const user = await UserModel.findOne({id:userID})
     res.status(200).send(user)
    }
    catch(err){
      res.status(400).send({err})
    }
})

module.exports={
    userRouter
}