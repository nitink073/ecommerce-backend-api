const {  getOrdersService, createOrderService, getdetailedorderservice, updateorderservice } = require("../services/orderservices")

const createorder2 = async (req,res,next) =>{
      
        try{
        const user_id = req.user.id

        const {items} = req.body

        const result = await createOrderService(
            user_id,
            items
        )
        
    return res.status(201).json(result)
    }
    catch(err){
   next(err)
    }
}
const getorders = async (req,res,next) =>{
    try{

        const orders = await getOrdersService();

        res.json(orders)
    }
    catch(err){
        next(err)
    }
}
const getdetailedorders = async(req,res,next) =>{
    try{
        const orders = await getdetailedorderservice()

        res.json(orders)
    }
    catch(err){
        next(err)
    }
}

const updateorderstatus = async(req,res,next)=>{
    try{
        const order_id = req.params.id

        const {status} = req.body

        const result = await updateorderservice(
            order_id,
            status
        )
        return res.status(200).json(result)
    }

    catch(err){
        next(err)
    }
}
module.exports = 
{   createorder2,
    getorders,
    getdetailedorders,
    updateorderstatus
}