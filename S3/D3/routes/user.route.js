const express=require("express");
const { UserModel } = require("../model/user.model");

const userRouter=express()

/**
 * @swagger
 * components:
 *  schemas:
 *     User:
 *       type: object
 *       properties:
 *           _id:
 *               type:string
 *               description: The auto genearted id of the user
 *           name:
 *              type: string
 *               description: The user name
 *           email:
 *              type: string
 *               description: The user email
 *           age:
 *              type: integer
 *               description: Age of the user
 * 
 */


/**
 * @swagger 
 * /users: 
 *  get:
 *    summary: This will get all the user data from the database
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: The list of all the users
 *        content:
 *             application/json:
 *                 schema:
 *                    type: array
 *                        item: 
 *                            $ref: "#/components/schemas/User"
 *       400:
 *        description: Something went wrong!!
 */
userRouter.get("/",async(req,res)=>{
  try{
    const users= UserModel.find()
    res.status(200).send({ msg: "Details of all the users", users });
  }
  catch(err){
      res.json({err})
  }
})


/**
 * @swagger
 * /users/{id}: 
 *  post:
 *    summary: To post the details of a new user
 *    tags: [Users]
 *     parameters:
 *        name: id
 *        schema:
 *           type: string
 *        required: true
 *    requestbody:
 *          required: true
 *          constent:
 *             applictaion/json:
 *                schema:
 *                   $ref: "#/components/schemas/User"
 *    responses:
 *      200:
 *        description: The list of all the users
 *        content:
 *             application/json:
 *                 schema:
 *                    type: array
 *                        item: 
 *                            $ref: "#/components/schemas/User"
 *        400:
 *           description: Something went wrong!!
 *       500:
 *        description: Some server is there!!
 */
userRouter.post("/",async(req,res)=>{
    const {name,email,age}=req.body;
    try{
      const user=new UserModel({name,email,age})
      await user.save()
      res.json({msg:"A new user has been added"})
    }
    catch(err){
        res.json({err})
    }
})


/**
 * @swagger
 * /users: 
 *  patch:
 *    summary: It will update the user details
 *    tags: [Users]
 *    requestbody:
 *          required: true
 *          constent:
 *             applictaion/json:
 *                schema:
 *                   $ref: "#/components/schemas/User"
 *    responses:
 *      200:
 *        description: The user was successfully registered
 *        content:
 *             application/json:
 *                 schema:
 *                    type: array
 *                        item: 
 *                            $ref: "#/components/schemas/User"
 * 
 *       500:
 *        description:  Some server is there!!
 */
userRouter.patch("/:userID",async(req,res)=>{
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


/**
 * @swagger
 * /users: 
 *  delete:
 *    summary: It will delete the user details
 *    tags: [Users]
//  *    requestbody:
//  *          required: true
//  *          constent:
//  *             applictaion/json:
//  *                schema:
//  *                   $ref: "#/components/schemas/User"
 *    responses:
 *      200:
 *        description: The user deleted successfully 
 *        content:
 *             application/json:
 *                 schema:
 *                    type: array
 *                        item: 
 *                            $ref: "#/components/schemas/User"
 * 
 *       500:
 *        description:  Some server is there!!
 */
userRouter.delete("/users/:userID",async(req,res)=>{
    const {userID}=req.params
    try{
      await UserModel.findByIdAndDelete({_id:userID})
      res.status(200).send({"msg":`The user with ID:${userID} has been deleted`})
    }
    catch(err){
     res.status(400).send({"error":err})
    }
})



module.exports={
    userRouter
}