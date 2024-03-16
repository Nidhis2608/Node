const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    id:Number,
    name:String,
    city:String, 
    age:Number
},{
    versionKey:false
})


const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}