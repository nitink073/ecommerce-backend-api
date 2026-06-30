const db = require("../db");

const createcategoryservice = async(name) =>{

    const [existing]  = await db.query(
        `select id from categories where name = ?`,[name]
    )
    
    if(existing.length > 0){
        throw new Error("category already exist")
    }
    const [result] = await db.query(
        `insert into categories(name)
        values(?)`,
        [name]
    )
    return {
        message:"category created successfully",
        category_id:result.insertId
    }
}


module.exports = {createcategoryservice}