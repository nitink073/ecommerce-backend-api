const db = require("../db")
const
    { getproductservice,
     createproductservice,
      deleteproductservice,
       updateproductservice,
        getallproductservice,
         partialupdateservice, 
         getproductbycategoryservice,
         advancedfilterservice} = require("../services/productservices")

const createproduct = async(req,res,next) =>{
    try{
         const result = await createproductservice(req.body)

         res.json(result)
       
    }
   catch(err){
       
       next(err)


   }
}
    
    const getproduct = async(req,res,next) =>{
        try{
        const {id} = req.params

        const product = await getproductservice(id)

        res.json(product)
        }
        catch(err){
            next(err)
        }
    }
    

const deleteproduct = async (req,res,next) =>{
    try{
       const {id} = req.params
       
        const result = await deleteproductservice(id)
       res.json({
        message:"product deleted successfully"
       })

    }

    catch(err){
     next(err)

    }
}

const updateproduct = async(req,res,next) =>{
    
       try{
        
        const {id} = req.params
        const {stock} = req.body

        const result = 
        await updateproductservice (id,stock)

        res.json(result)

       }

       catch(err){
        next(err)
       }
}


const partialupdate = async (req,res,next)=>{
    try{
     const {id} = req.params

     const updates = req.body

     const result = await partialupdateservice(
        id,
        updates
     )
     res.json(result)

    }

    catch(err){
       next(err)
    }
}
const getallproducts = async(req,res,next) =>{
    try{
      
        const page = parseInt(req.query.page) || 1;

        const limit = parseInt(req.query.limit) || 5;

        const search = req.query.search || "";

        const category = req.query.category || null;

        const sort = req.query.sort || "id";
 
        const result = await getallproductservice(
            page,
            limit,
            search,
            category,
            sort
        )

        res.json(result)

    }
    catch(err){
        next(err)
    }
}

const getproductbycategory = async(req,res,next) =>{
    try{
        const {id} = req.params
        const products = await getproductbycategoryservice(id)
        res.json(products)
        
    }
    catch(err){
        next(err)
    }
}

const advancedfilterproducts = async(req,res,next) =>{

    try{

       const page = parseInt(req.query.page) || 1

       const limit = parseInt(req.query.limit) || 5

       const search = req.query.search || "";
       
       const category = req.query.category || null;

       const sort = req.query.sort || "id";
       const products = await advancedfilterservice(
        page,
        limit,
        search,
        category,
        sort
       )
       res.json(products)

    }
    catch(err){
        next(err)
    }
}

module.exports =
    {
    createproduct,
    getproduct,
    deleteproduct,
    updateproduct,
    partialupdate,
    getallproducts,
    getproductbycategory,
    advancedfilterproducts
}