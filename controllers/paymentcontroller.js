// const db = require("../db")
const { createpaymentservice } = require("../services/paymentservices")

const createpayment = async(req,res,next) =>{
    // console.log(req.body)
    try{
        const { order_id,amount,payment_method} = req.body

        await createpaymentservice (
            order_id,
            amount,
            payment_method
        )

        res.status(201).json({
            message:"payment created"
        })
    }
    catch(err){
        next(err)
    }
}

module.exports = {createpayment}