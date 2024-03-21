// const ws=require("ws")

// const wss=new ws.WebSocketServer({port:8080})


// wss.on("connection",(socket)=>{
//     console.log("Connected to the client")
//     socket.send("Hello from the server!!")
//     //listing from the client side
//     socket.on("message",(msg)=>{
//         console.log(msg.toString())
//     })
// })



//In the browser inspect console to run server
//const socket= new WebSocket("ws://localhost:8080")

//listening to the event at the client side
//To get the notification at the client side as well
//const socket=new WebSocket("ws://localhost:8080")
// socket.onopen=()=>{
//     console.log("Connected to the server")
// }



//To send the notification from the server side  and listen at the client side 
// const socket=new WebSocket("ws://localhost:8080")
     //send the notification from the server side
// socket.onopen=()=>{
//     console.log("Connected to the server")
//     socket.send("Hello from the client")
// }
     //listen at the client side 
// socket.onmessage=(event)=>{
//     console.log(event.data)
// }




//ACTIVITY
/**
 * Create a web socket server which will send following responses:
 * client ==> Hey!
 * server==>Hello!
 * 
 * client ==> Bye!
 * server ==> Ta Ta!
 * 
 * client ==> Yo! or aything else
 * server ==> Blah Blah!
 */


// Activity MYCODE
// wss.on("connection",(socket)=>{
//     console.log("Connected to the client")
// socket.on("message", (message)=>{
//     switch(message){
//         case 'Hey!':
//             socket.send("Hello")
//              break
//         case 'Bye!':
//             socket.send("Ta Ta")
//             break
//         case 'Yo':
//             socket.send("Blah Blah!!")
//             break
//         default:
//             socket.send(message)
//             break
//     }
// })
// })

//Solution of Activity
// const {WebSocketServer}=require("ws")

// const wss=new WebSocketServer({port:8080})

// wss.on("connection",(socket)=>{
//     console.log("Connected to the client")
//     socket.on("message",(msg)=>{
//         msg=msg.toString()
//         if(msg==='Hey!'){
//             socket.send("Hello!!")
//         } else if(msg==='Bye!'){
//             socket.send("Ta Ta!!")
//         } else {
//             socket.send("Blah Blah!!")
//         }
//     })
// })




//SOCKET.IO
const express=require("express")
const http=require("http")
const {Server}=require("socket.io")

const app=express()
const httpServer=http.createServer(app)

const socketServer=new Server(httpServer)

app.get("/",(req,res)=>{
    res.send({"msg":"This is the home page"})
})

httpServer.listen(8080,()=>{
    console.log("Server is running at port 8080")
})
socketServer.on("connection",(socket)=>{
//   socket.emit("grettings","Hello my fellow developers, I am sending this to server side socket")
//   socket.on("message",(msg)=>{
//     console.log(msg)
//   })



socket.emit("grettings","Hello from the server!")
socket.on("message",(msg)=>{
    console.log(msg)
})
})