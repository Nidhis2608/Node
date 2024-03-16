const jwt=require("jsonwebtoken")
const {blacklist}=require('../blacklist')
const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        if(blacklist.includes(token)){
            res.json({msg:"Please login to access"})
        }
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                next()
            }
        })
    } else {
        res.json({msg:"You are not Authorized"})
    }
}

module.exports={
    auth
}