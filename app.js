// console.log("app file running")
// const express = require("express")

// require("dotenv").config();

// const app = express();
// const authroutes = require("./routes/authroutes")
// const testroute = require("./routes/testroute");
// const productroute = require("./routes/productroute")
// const customerroutes = require("./routes/customerroutes");
// const orderroute = require("./routes/orderRoute");
// const errormiddleware = require("./middleware/errormiddleware");
// const paymentroute = require("./routes/paymentroute")
// const categoryroute = require("./routes/categoryroute")
// // console.log(paymentroute)
// app.use(express.json())
// app.get("/",(req,res)=>{
//     res.send("root working")
// })

// app.get("/hello",(req,res)=>{
//     res.send("hello working")
// })

// app.use("/auth",authroutes)
// app.use("/api",testroute)
// app.get("/hello",(req,res)=>{
//     console.log("HELLO HIT");

//     res.json({
//         message:"hello"
//     });
// });
// app.use("/products",productroute)
// app.use("/orders", orderroute)
// app.use("/payments",paymentroute)
// app.use("/categories",categoryroute)
// app.use(errormiddleware)


// module.exports = app
const errormiddleware = require("./middleware/errormiddleware")
const express = require("express");
const authroutes = require("./routes/authroutes")
const productroute = require("./routes/productroute")
const categoryroute = require("./routes/categoryroute")
const reviewroute = require("./routes/reviewroute")
const cartroute = require("./routes/cartroute")
const orderRoute = require("./routes/orderRoute")
require("dotenv").config()
const app = express();

// app.get("/", (req,res)=>{
//     res.send("ROOT WORKING");
// });
// app.get("/hello",(req,res)=>{
//     res.send("hello working")
// })
app.use(express.json())
app.use("/auth",authroutes)
app.use("/orders",orderRoute)
app.use("/products",productroute)
app.use("/categories",categoryroute)
app.use("/reviews",reviewroute)
app.use("/cart",cartroute)
app.use(errormiddleware)

module.exports = app;