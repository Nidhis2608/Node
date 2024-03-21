const nodemailer=require("nodemailer")
var cron = require('node-cron');


//for STMP Configure from Ethereal
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'haskell48@ethereal.email',
        pass: 'WSWtPf9jJrvKxnK2Hb'
    }
});



//SEND EMAIL USING CRON SCHEDULER IN EVERY 10 SECONDS
cron.schedule('*/10 * * * * *', () => {
    transporter.sendMail({
        from:"nidhi@gmail.com",
        to:"haskell48@ethereal.email",
        subject:"cron job scheduler",
         text:"Sending from a cron scheduled task"
    })
    .then(()=>{
        console.log("Email has been sent")
    })
    .catch((err)=>{
        console.log("Error in sending the mail")
        console.log(err)
    })
  });



//TO SEND A SINGLE MAIL
transporter.sendMail({
    from:"nidhi@gmail.com",
    to:"haskell48@ethereal.email",
    subject:"Response to your Admission Query",
    text:"This is the fourth mail that I am sending through nodemailer"
    // html:`
    //    <div>
    //       <p>To admisssion what courses we offer please visit <a href ="https://www.masaischool.com/">This link</a></p>
    //   </div>
    // `
})
.then(()=>{
    console.log("Email has been sent")
})
.catch((err)=>{
    console.log("Error in sending the mail")
    console.log(err)
})



//TO SEND MAILS IN BULK
// const mails=[
//     {
//       from:"nidhi@gmail.com",
//       to:"haskell48@ethereal.email",
//       subject:"First mail",
//       text:"This is the first mail that I am sending through nodemailer"
//     },
//     {
//       from:"nidhi@gmail.com",
//       to:"haskell48@ethereal.email",
//       subject:"Second mail",
//       text:"This is the second mail that I am sending through nodemailer"
//     },
//     {
//       from:"nidhi@gmail.com",
//       to:"haskell48@ethereal.email",
//       subject:"Third mail",
//       text:"This is the third mail that I am sending through nodemailer"
//     }
// ]

// mails.forEach((ele)=>{
//     transporter.sendMail(ele).then(()=>{
//         console.log("Email has been sent")
//     }) .catch((err)=>{
//         console.log("Error in sending the mail")
//         console.log(err)
//     })
// })


//Create an API endpoint to send email to a particular 
//email id that is being passed along with the subject and text through express
//   const sendMail=(from,to,subject,text)=>{
//     transporter.sendMail({
//        from,
//        to,
//        subject,
//        text
//     })
//     .then(()=>{
//         console.log("Email has been sent")
//     })
//     .catch((err)=>{
//         console.log("Error in sending the mail")
//         console.log(err)
//     })
//  }

// module.exports={
//     sendMail
// }