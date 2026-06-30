const db = require("../db");

const addtocartservice = async (
    user_id,
    product_id,
    quantity
) => {

    const [productresult] = await db.query(
        "SELECT * FROM products WHERE id = ?",
        [product_id]
    );

    
    if(productresult.length === 0){
        throw new Error("Product not found");
    }

    const product = productresult[0];

if(quantity > product.stock){
    throw new Error(
        `Only ${product.stock} items available`
    );
}
const [cartresult] = await db.query(
    `SELECT *
     FROM carts
     WHERE user_id = ?
     AND product_id = ?`,
    [user_id, product_id]
);

if(cartresult.length > 0){
    const existingcart = cartresult[0]

    const totalquantity = existingcart.quantity + quantity

    if(totalquantity > product.stock){
        throw new Error(
            `only ${product.stock} items available`
        )
    }
    await db.query(
        `update carts set quantity = ? where id = ?`,
        [totalquantity,existingcart.id]
    )
    return {
        message:"cart updated successfully"
    }
}
if(cartresult.length === 0){
    await db.query(
        `insert into carts
        (user_id,product_id,quantity)
        values (?,?,?)`,
        [user_id,product_id,quantity]
    )
}


return {
    message:"product added to cart"
}
}

const getcartservice = async(user_id) => {

    const [result] = await db.query(
        `
        select carts.product_id,
        carts.quantity,
        products.name,
        products.price
        from carts  inner join products 
        on carts.product_id = products.id
        where carts.user_id = ?
        `,
        [user_id]
    )


return result
}
const removecartservice = async(cart_id,user_id) =>{
    
    const [result] = await db.query(
        `
        select * from carts 
        where id = ? and user_id = ?
        `,
        [cart_id,user_id]
    )

      if(result.length === 0){
        throw new Error("cart item not found")
      }
    await db.query(
        `
        delete from carts where id = ?
        `,
        [cart_id]
    )
    return {
        message:"remove cart"
    }
}

const clearcartservice = async(user_id)=>{
       await db.query(
        `
        delete from carts where user_id = ?
        `,
        [user_id]
    )
    return {
        message:"clear carts"
    }
}



const getcartordersservice = async(user_id) =>{

    const [result] = await db.query(
        `
        select * from orders where user_id = ?
        `,
        [user_id]
    )

    return result
}

const getorderdetailservice = async(order_id) =>{

    const [result] = await db.query(
        `
        select * from orders where id = ?
        `,[order_id]
    )
    if(result.length === 0){
        throw new Error("order not found")
    }
    return result[0]
}
const checkoutserviceT = async(user_id) =>{
    const connection = await db.getConnection();
    try{
        const[cart] = await connection.query(
            `
            select * from carts where user_id =?
            `,
            [user_id]
        )
        if(cart.length === 0 ){
            throw new Error("cart is empty")
        }
        const [cartitems] = await connection.query(
            `
            select 
            carts.product_id,
            carts.quantity,
            products.price,
            products.stock
            from carts
            inner join products
            on carts.product_id = products.id
            where carts.user_id = ?
            `,[user_id]
        )
        let total = 0 ;
        for(const item of cartitems) {
            if(item.quantity > item.stock){
                throw new Error(
                    `only {(item.stock} items available`
                )
            }
            total += item.price * item.quantity
        }
        await connection.beginTransaction()

        const [orderResult] = await connection.query(
            `
            insert into orders (user_id,total_amount,status)
            values(?,?,?)
            `,[user_id,total,"pending"]
        )
        const order_id = orderResult.insertId

        for(const item of cartitems){
            await connection.query(
                `insert into order_items
                (
                order_id,
                product_id,
                quantity,
                price
                )
                values(?,?,?,?)
                `,[
                    order_id,
                    item.product_id,
                    item.quantity,
                    item.price
                ]
            )
        }
        for(const item of cartitems){
            await connection.query(
                `
                update products
                set stock = stock - ? 
                where id = ?
                `,
                [item.quantity,
                item.product_id
                ]
            )
        }
        await connection.query(
            `delete from carts where user_id = ?`,[user_id]
        )
        await connection.commit()
        return {
            message:"order placed successfully",
            order_id,
            total_amount :total
        }
    }
    catch(err){
        await connection.rollback()
        throw err
    }
    finally {
        connection.release()
    }
}
module.exports = {
    addtocartservice,
    getcartservice,
    removecartservice,
    clearcartservice,
    getcartordersservice,
    getorderdetailservice,
    checkoutserviceT
}