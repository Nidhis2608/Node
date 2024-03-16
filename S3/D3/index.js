const express=require("express")
const swaggerJsDoc=require("swagger-jsdoc")
const { connection } = require("./config/db.js");
const { userRouter } = require("./routes/user.route.js");
const swaggerUi=require("swagger-ui-express")
const app=express()
app.use(express.json())

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'User Management System',
        version: '1.0.0',
      },
      servers:[
        {
            url:"http://localhost:4500/"
        },
        {
            url:"http://www.example.com"
        }
      ]
    },
    apis: ['./routes*.js'], 
  };
const openapiSpecification=swaggerJsDoc(options)
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/users",userRouter)


app.listen(4500,async()=>{
    await connection
    console.log("Connected to DB")
    console.log("Server is running at port 4500")
})