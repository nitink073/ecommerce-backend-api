const express = require("express");
const { createpayment } = require("../controllers/paymentcontroller");

const router = express.Router();

router.post("/payments", createpayment)

// router.get("/",(req,res)=>{

//    res.send("GET working")
// })
// router.post("/",createpayment)

module.exports = router