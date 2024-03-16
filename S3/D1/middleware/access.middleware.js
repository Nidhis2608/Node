const access= (...permittedRoles)=>{
  return (req,res,next)=>{
    if(permittedRoles.includes(req.role)){
        next()
    } else {
        res.json({msg:"You have no access"})
    }
  }
}

module.exports={
    access
}

