const errormiddleware = (err,req,res,next) =>{
    console.error(err);

    const statuscode = err.statuscode || 500;

    res.status(500).json({
        message:err.message || "server error"
    })
}

module.exports = errormiddleware