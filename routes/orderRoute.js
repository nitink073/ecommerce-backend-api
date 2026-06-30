const express = require("express");
const verifytoken = require("../middleware/authmiddleware");
const { createorder2, getorders, getdetailedorders, updateorderstatus} = require("../controllers/ordercontroller");

const router = express.Router();

router.post("/", verifytoken, createorder2);
router.get("/",getorders)
router.get("/details",getdetailedorders)
router.put("/:id/status",verifytoken,updateorderstatus)
module.exports = router;