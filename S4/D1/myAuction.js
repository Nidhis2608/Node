// const { error } = require("console")
const EventEmitter=require("events") 

//Auction class
class Auction extends EventEmitter{
    constructor(){
        super()
        this.highestBid=0
        this.highestBidder=null
    }
    //function to place a bid
    placeBid(amount,bidder){
        if(amount>this.highestBid){
            this.highestBid=amount
            this.highestBidder=bidder
            //event for placing the new bid
            this.emit("newBid",{amount,bidder})
        } else {
            this.emit("bidError",{message:"The bid amount should be higher than the previous bid",amount,bidder})
        }
    }
}

//instance
const myAuction=new Auction()

//actions
myAuction.on("newBid",(bid)=>{
    console.log(`${bid.bidder} made a bid of ${bid.amount}bucks`)
})

myAuction.on("bidError",(error)=>{
    console.log(`Error: ${error.message},${error.bidder} made a bid of ${error.amount}`)
})

//want to place a bids
myAuction.placeBid(100,"Pulkit")
myAuction.placeBid(150,"Aman")
myAuction.placeBid(80,"Jayesh")
