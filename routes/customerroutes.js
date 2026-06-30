const express = require("express")
const verifytoken = require("../middleware/authmiddleware")
const router = express.Router();
// const { createuser } = require("../controllers/productcontroller")

// router.post("/user",createuser)

module.exports = router