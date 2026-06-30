const { createcategoryservice} = require("../services/categoryservice")

const createcategory = async(req,res,next) =>{

  try{
       
      const {name} = req.body

      if(!name) {
        return res.status(400).json({
            message:'category name required'
        })
      }
      const result = await createcategoryservice(name)
      
      return res.status(201).json(result)
     
    }
    catch(err){
        next(err)
    }
}


module.exports = {createcategory}