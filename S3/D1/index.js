const express = require('express')
const {connection} = require("./config/db")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { UserModel } = require('./model/user.model')
const {auth} = require("./middleware/auth.middleware")
const {access} = require("./middleware/access.middleware")
const app = express() 
app.use(express.json())



app.get("/",(req,res)=>{
    res.json({msg:"Home page"})
});

app.post("/register",async(req,res)=>{
    const {username,email,password, role}=req.body
    try{
      bcrypt.hash(password, 5 ,async(err, hash) =>{
          if(err){
              res.status(200).json({err})
          } else {
              const user=new UserModel({username,email,password:hash, role})
              await user.save()
               res.status(200).json({msg:"The new user has been registered!"})
          }
      });
    }
    catch(err){
      res.status(400).json(err)
    }
  })
  

 app.post("/login", async(req,res)=>{
    const {email,password}=req.body
    try{
      const user= await UserModel.findOne({email})
      if(user){
          bcrypt.compare(password, user.password, (err, result)=> {
             if(result){
              const accessToken = jwt.sign({userID:user._id}, 'nidhi',{expiresIn:"30"})
               const refreshToken = jwt.sign({userID:user._id},"singh",{expiresIn:120})
               res.json({msg:"Login successfull", accessToken,refreshToken})
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


  //RestrictedRoutes
  //access by buyers and sellers
  app.get("/products", auth, access("buyer","seller"), (req,res)=>{
    res.json({msg:"Products data"})
  })

  //access by customer and seller
  app.get("salesdata", auth, access("customer","seller"), (req,res)=>{
    res.json({msg:"Sales data"})
  })

  //accessed by seller
  app.patch("/products/:id", auth, access("seller"), (req,res)=>{
    res.json({msg:"Updated the products data"})
  })

// accessed by seller
  app.delete("/products/:id",  auth, access("seller"), (req,res)=>{
    res.json({msg:"Deleted the products data"})
  })

  app.get("/refresh",(req,res)=>{
    const refreshToken = req.headers.authorization?.split(" ")[1]
    jwt.verify(refreshToken,"singh",(err,decoded)=>{
      if(decoded){
        const accessToken=jwt.sign({userID:decoded.user._id},"nidhi",{expiresIn:30})
        res.json({accessToken})
      } else {
        res.json({err})
      }
    })
  })

app.listen(3000,async()=>{
    await connection;
    console.log("Conneted to db");
    console.log("Server is running at port 3000")
})