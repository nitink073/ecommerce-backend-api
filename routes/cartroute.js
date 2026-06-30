const express = require("express")
const verifytoken = require("../middleware/authmiddleware")
const { addtocart, getcart, removecart, cleartcart, checkoutt, getcartorders, getorderdetail, createorder2 } = require("../controllers/cartcontroller")

const router = express.Router()


router.get("/cart",verifytoken,getcart)
router.delete("/cart/:id",verifytoken,removecart)
router.delete("/cart",verifytoken,cleartcart)
router.get("/getcart",verifytoken,getcartorders)
router.get("/getcartbyid/:id",verifytoken,getorderdetail)
router.post("/",verifytoken,createorder2)
module.exports = router