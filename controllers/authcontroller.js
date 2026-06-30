const db = require('../db')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async(req,res,next)=>{
    try{
      const {name,email,password} = req.body

      if(!name || !email || !password){
        return res.status(400).json({message:"all fileds required"})
      }
        // check existing user

      const [existing] = await db.query(
       "select id from users where email = ?",[email]
      )

      if(existing.length>0){
        return res.status(409).json({message:"email already exists"})
      }

    const hashedpassword = await bcrypt.hash(password,10)

    const [result] = await db.query("insert into users (name,email,password) values (?,?,?)",[name,email,hashedpassword])
  
      return res.status(201).json({
        message:"user registered successfully",
        user_id:result.insertId
      })

    }
    catch(err){
     next(err)
  
    }
};

const login = async (req,res,next) =>{

    try{
      
     const {email,password} = req.body

     const [users] = await db.query("select * from users where email =?",[email])
    
    if(users.length === 0){
        return res.status(404).json({message:"invalid email or password"})
    }
    const user = users[0]
   
    const ismatch = await bcrypt.compare(password,user.password);

    if(!ismatch){
        return res.status(400).json({message:"invalid password"})
    }
    const token = jwt.sign(
        {id:user.id,
        email:user.email,
        role:user.role
        },
        process.env.JWT_SECRET,
        { expiresIn:"1h"}
    )

    return res.status(200).json({
        message:"login successful",
        token
    })
}
    catch(err){
     next(err)

    }
}

module.exports =  {register,login}