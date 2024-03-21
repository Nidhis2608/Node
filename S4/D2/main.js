const {EventEmitter}=require("events")

const Player=new EventEmitter()

Player.on("shot",(name)=>{
    console.log(`${name} got injured`)
})

Player.on("dead",(name)=>{
    console.log(`${name} is dead`)
})

Player.emit("dead","Mario")
Player.emit("shot","Luigi")