// const { search } = require("../app")
const db = require("../db")

const createproductservice = async(data) =>{

    const {name,description,price,stock,category_id,image_url} = data
            
            if(!name || !price || !stock){

                throw new Error(
                    "name, price and stock requied"
                )
            }
    
            await db.query(
                `insert into products (name,description,price,stock,category_id,image_url)
                 values(?,?,?,?,?,?)`,
                  [name,description,price,stock,category_id,image_url]
            )
           
            return {
                message:"product created successfully"
            }
        }

const getproductservice = async(id) =>{
    const [rows] = await db.query(
        "select * from products where id = ?",
        [id]
    )
    if(rows.length === 0){
        throw new Error("product not found")
    }
    return rows[0]
}

const deleteproductservice = async(id) =>{
      const [rows] = await db.query("delete from products where id = ?",[id])

       if(rows.affectedRows === 0){
        throw new Error("product not found")
       }
       return {
        message:"product deleted successfully"
       }
}

const updateproductservice = async (id,stock) =>{

         if(stock === undefined){

             throw new Error("stock is required")
                }
                const [rows] = await db.query("update products set stock = ? where id = ?",[stock,id])
               
              if(rows.affectedRows === 0){
                throw new Error("product not found")
              }
           return {
            message:"product updated successfully"
           }
        
}

const partialupdateservice = async (id,updates) =>{
   
      const allowedfield =  [
        "name",
        "description",
        "price",
        "stock",
        "category_id",
        "image_url"
      ];

      if(Object.keys(updates).length === 0){
        throw new Error("no fields provided")
      }
      for(let key in updates){
        if(!allowedfield.includes(key)){
            throw new Error(`invalid filed:${key}`)
        }
      }
        // validate price
      if(updates.price !== undefined && updates.price <= 0){
        throw new Error(
            "price must be greater than 0"
        )
      }
    //   validate stock
     if(updates.stock !== undefined && updates.stock < 0){
        throw new Error(
            "stock cannot be negative"
        )
     }
    //   validate name
     if(updates.name !== undefined && updates.name.trim() === ""){
        throw new Error(
            "name cannot be empty"
        )
     }

      const fields = [];
      const values = [];

      for(let key in updates){
        fields.push(`${key} = ?`)
        values.push(updates[key])   

      }
       const query = `update products set ${fields.join(", ")} where id = ?`;
       values.push(id);

       const [result] = await db.query(query,values);

       if(result.affectedRows === 0){
        throw new Error(
            "product not found"
        )
       }

       return {
        message:"product updated successfully"
       }

}

const getallproductservice = async (page,limit,search,category,sort) =>{
    const offset = (page - 1) * limit;

    let query = `select * from products where name like ?`;

    const values = [`%${search}%`]
   
    if(category){
        query +=" and category_id =?";
        values.push(category)
    }

    const allowedsortfield = [
        "id",
        "price",
        "name"
    ]

    if(allowedsortfield.includes(sort)){
            query += ` order by ${sort}`
    }

    query += " limit ? offset ?";
    values.push(limit,offset);

    console.log(query)
    console.log(values)

    const [products] = 
    await db.query(query,values)

    return products;
}

const getproductbycategoryservice = async(category_id) =>{
    
    const [products] = await db.query(
        `select * from products where category_id = ?`,
        [category_id]
    )
    return products
}

const advancedfilterservice = async (
    page,
    limit,
    search,
    category,
    sort
) =>{
    const offset = (page - 1) * limit

    let query = `select * from products where name like ?`
    const values = [`%${search}%`];

    if(category){
        query += ` and category_id = ?`;

        values.push(category)
    }
    const allowedfield = [
        "id",
        "price",
        "name"
    ]
    if(allowedfield.includes(sort)){
        query += ` order by ${sort}`;
    }

    query += ` limit ? offset ?`;

    values.push(
        limit,
        offset
    )


   const [products] = 
   await db.query(
    query,
    values
   )
    return products
}




module.exports = 
   {createproductservice,
    getproductservice,
    deleteproductservice,
    updateproductservice,
    partialupdateservice,
    getallproductservice,
    getproductbycategoryservice,
    advancedfilterservice
}