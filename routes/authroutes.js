const express = require("express");
const { register, login } = require("../controllers/authcontroller");
const verifytoken = require("../middleware/authmiddleware");
const adminonly = require("../middleware/adminmiddleware");
const { createproduct } = require("../controllers/productcontroller");

const router = express.Router();
router.post("/register",register)
router.post("/login",login)
module.exports = router