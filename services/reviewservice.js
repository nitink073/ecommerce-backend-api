const db = require("../db")

const createreviewservice = async(
    user_id,
    product_id,
    rating,
    comment
    )=>{

   if(!product_id){
    throw new Error("product id is required")
   }


    if(rating<1 || rating>5) {
        throw new Error(
            "rating must be between 1 and 5"
        )
    }

    if(comment && comment.trim() === ""){
        throw new Error(
            "comment cannot be empty"
        )
    }

    const [product] = await db.query(
        `
        select id from products where id = ?`,[product_id]
    )

    const [existing] = await db.query(

        `select id from reviews where user_id = ? and product_id =?`,[user_id,product_id]
    )
    if(existing.length >0){
        throw new Error(
            "you already reviewed this product"
        )
    }
    const [result] = await db.query(
        `insert into reviews(
        user_id,
        product_id,
        rating,
        comment) values (?,?,?,?)`,
        [user_id,product_id,rating,comment]
    )
  return {
    message:"review added successfully",
    review_id:result.insertId
  }
}

const getreviewsbyproductservice = async(
    product_id
) =>{
    const [reviews] = await db.query(
        `select users.name as user_name,
        reviews.rating,
        reviews.comment
        
        from reviews
        
        inner join users
        on reviews.user_id = users.id
        
        where reviews.product_id = ?`,
        [product_id]
    )
    return reviews
}



module.exports = 
{
    createreviewservice,
    getreviewsbyproductservice

}