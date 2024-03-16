const express=require('express')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel } = require('../model/user.model')
const { blacklist } = require('../blacklist')
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
  const {username,email,password}=req.body
  try{
    bcrypt.hash(password, 5 ,async(err, hash) =>{
        if(err){
            res.status(200).json({err})
        } else {
            const user=new UserModel({username,email,password:hash})
            await user.save()
             res.status(200).json({msg:"The new user has been registered!"})
        }
    });
  }
  catch(err){
    res.status(400).json(err)
  }
})

userRouter.post("/login", async(req,res)=>{
  const {email,password}=req.body
  try{
    const user= await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password, user.password, (err, result)=> {
           if(result){
            res.status(200).json({msg:"Login successful","token":jwt.sign({course: 'nem104' }, 'masai',{expiresIn:30})})
           } else {
            res.status(200).json({msg:"Password does not match"})
           }
        });
        
    } else {
        res.status(200).json({msg:"Wrong Credentials"})
    }
  }
  catch(err){
    res.status(400).json({err})
  }
})

userRouter.get("/logout",(req,res)=>{
    //take the token 
    const token=req.headers.authorization
    //take the blacklist array
    //push the token inside the array
    //send a response saying you have been logout
    try{
        blacklist.push(token)
        res.status(200).json({msg:"You have been logout"})

    } catch(err){
      res.status(400).json({err})
    }
})

module.exports={
    userRouter
}