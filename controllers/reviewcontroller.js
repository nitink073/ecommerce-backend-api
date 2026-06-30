const { createreviewservice, getreviewsbyproductservice } = require("../services/reviewservice")

const createreviews = async(req,res,next) =>{
    try{
      
        const user_id = req.user.id
     const {
         product_id,
         rating,
         comment
     } = req.body;

    const result = await createreviewservice(
        user_id,
        product_id,
        rating,
        comment
    )
    res.status(201).json({
        message:'review created'
    })

    }
    catch(err){
        next(err)
    }
}

const getreviewsbyproduct = async(req,res,next) =>{
    try{
  
    const {id} = req.params
    const reviews = await getreviewsbyproductservice(id)

    res.json(reviews)
    }
    catch(err){
        next(err)
    }
}



module.exports = 
{
    createreviews,
    getreviewsbyproduct
}