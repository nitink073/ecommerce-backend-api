const 
 { 
    addtocartservice,
    getcartservice,
    removecartservice,
    clearcartservice,
    getcartordersservice,
    getorderdetailservice,
    checkoutserviceT
} = require("../services/cartservice");

const addtocart = async (req,res,next) => {

    try{

        const { product_id, quantity } = req.body;

        const user_id = req.user.id;

        const result = await addtocartservice(
            user_id,
            product_id,
            quantity

        );
      
        return res.status(200).json(result)
    }
    
    catch(error){
     next(err)
    }
}

const getcart = async(req,res,next) =>{
    try{
        const user_id = req.user.id;
        const result = await getcartservice(user_id);

        return res.status(200).json(result)
    }
    catch(err){
      next(err)
    }
}

const removecart = async(req,res,next)=>{
    try{
        const cart_id = req.params.id
        const user_id = req.user.id

        const result = await removecartservice(cart_id,user_id)

        return res.status(200).json(result)
    }
    catch(err){
     next(err)
    }
}

const cleartcart = async(req,res,next)=>{
    try{
        const user_id = req.user.id

        const result = await clearcartservice(user_id)
        
        return res.status(200).json(result)
    }
    catch(err){
       next(err)
    }
}



const getcartorders = async(req,res,next) =>{
    try{
    const user_id = req.user.id

    const result = await getcartordersservice(user_id)

    return res.status(200).json(result)
    }
    catch(err){
        next(err)
    }
}
const getorderdetail = async(req,res,next)=>{
    try{
        const order_id = req.params.id
        
        const result = await getorderdetailservice(order_id)

        return res.status(200).json(result)
    }
    catch(err){
        next(err)
    }
}
const createorder2 = async(req,res,next) =>{
    try{
        const user_id = req.user.id;
        const result = await checkoutserviceT(user_id)

        return res.status(200).json(result)
    }
    catch(err){
      next(err)
    }
}

module.exports =
{
    addtocart,
    getcart,
    removecart,
    cleartcart,
    getcartorders,
    getorderdetail,
    createorder2
}