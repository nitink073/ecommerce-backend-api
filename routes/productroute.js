const express = require("express");
const verifytoken = require("../middleware/authmiddleware");
const { createproduct, getproduct, deleteproduct, updateproduct, partialupdate, getallproducts, getproductbycategory, advancedfilterproducts} = require("../controllers/productcontroller");
const { route } = require("./authroutes");
const adminonly = require("../middleware/adminmiddleware");
const validate = require("../middleware/validate");
const createproductschema = require("../validators/productvalidator");
const router = express.Router();


// router.get("/category/:id",(req,res)=>{
//     res.json({
//         categoryId:req.params.id
//     })
// })
router.get("/category/:id",verifytoken,adminonly,getproductbycategory)
router.get("/filter",verifytoken,adminonly,advancedfilterproducts)
router.get("/:id",verifytoken,adminonly,getproduct)
router.get("/",verifytoken,adminonly,getallproducts)
router.put("/:id/stock",verifytoken,adminonly,updateproduct)
router.patch("/:id",verifytoken,adminonly,partialupdate)
router.delete("/:id",verifytoken,adminonly,deleteproduct)
router.post("/",verifytoken,adminonly,createproduct)
module.exports = router