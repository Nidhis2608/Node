const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user.model")


const auth= (req,res,next)=>{
  const token = req.headers.authorization?.split(" ")[1]
  if(token){
    jwt.verify(token,"nidhi",async(err,decoded)=>{
        if(decoded){
            const {userID}= decoded
            const user=await UserModel.findOne({_id:userID})
            const requiredRole= user.role;
            req.role=requiredRole
            next()
        } else {
            res.json({err})
        }
    })
  } else {
    res.json({msg:"Please login!!"})
  }
}

module.exports={
    auth
}