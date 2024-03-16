const mongoose=require("mongoose")

const main=async()=>{
    try{
        const connection= await mongoose.connect("mongodb://127.0.0.1:27017/learnmongoose")
       console.log("Connected to the DB")
       //Step3 : Inserted the data
       await UserModel.insertMany([{name:"Nidhi",age:21,isMarried:false},{name:"Sakshi",age:21,isMarried:false},{name:"Rahul",age:22,isMarried:true}])
       //To insert one user only we use model as a constructor function
            //    const user=new UserModel({
            //      name:"Aarti",
            //      age:20,
            //     isMarried:false
            //   })
            //  await user.save()
       console.log("Data has been inserted")
          //To get the userModel data
              const users=await UserModel.find()
              console.log(users);
    } 
    catch(err){
       console.log(err)
    }
}

main()

//step1 : Creating a schema or blueprint
const userSchema=mongoose.Schema({
   // name: String,
   //age: Number,
   //isMarried:Boolean
     //For VALIDATION
     name:{type: String, required:true},
     age: {type: Number, required:true},
     isMarried:{type: Boolean, required:true}

   
},{
    versionKey:false
})

//step2 : Creating the model from schema
const UserModel=mongoose.model("user",userSchema)

