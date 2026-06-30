const express = require("express")
const { createcategory} = require("../controllers/categorycontroller")
const { addtocart } = require("../controllers/cartcontroller")
const verifytoken = require("../middleware/authmiddleware")

const router = express.Router()


router.post("/:id",createcategory)
router.post("/cart",verifytoken,addtocart)



module.exports = router