 const mongoose=require("mongoose")

const connection= mongoose.connect("mongodb+srv://nidhis:singh@cluster0.h2sam23.mongodb.net/learnatlasb34?retryWrites=true&w=majority&appName=Cluster0")


//1 Creating the user schema
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    city:String
},{
    versionKey:false
})

//2 Creating the model
const UserModel=mongoose.model("user",userSchema)

module.exports = {
    connection,
    UserModel
}