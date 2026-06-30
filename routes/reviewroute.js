const express = require("express")
const { createreviews, getreviewsbyproduct } = require("../controllers/reviewcontroller")
const verifytoken = require("../middleware/authmiddleware")

const router = express.Router()

router.post("/",verifytoken,createreviews)
router.get("/product/:id",getreviewsbyproduct)

module.exports = router