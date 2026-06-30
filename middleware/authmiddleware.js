const jwt = require("jsonwebtoken")

const verifytoken = (req,res,next) =>{
    try{
    
     const authheader = req.headers.authorization;

     if(!authheader){
        return res.status(401).json({message:"no token provided"})
     }
     
     const token = authheader.split(" ")[1];

     const decoded = jwt.verify(token,process.env.JWT_SECRET)

     req.user = decoded;

     next();

    }

    catch(err){
      
     return res.status(401).json({message:"invalid token"})
    }
}

module.exports = verifytoken