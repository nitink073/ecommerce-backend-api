const db = require("../db");

const createOrderService = async(user_id, items)=>{

    const connection = await db.getConnection();

    try{

        await connection.beginTransaction();

        let total = 0;

        // validate products + calculate total

        for(let item of items){

            const [product] = await connection.query(
                "select * from products where id = ? for update",
                [item.product_id]
            )

            if(product.length === 0){
                throw new Error("product not found");
            }

            if(item.quantity > product[0].stock){
                throw new Error("insufficient stock");
            }

            total += product[0].price * item.quantity;
        }

        // create order

        const [orderResult] = await connection.query(
            "insert into orders (user_id,total_amount,status) values (?,?,?)",
            [user_id,total,"pending"]
        )

        const orderId = orderResult.insertId;

        // insert order items + reduce stock

        for(let item of items){

            const [product] = await connection.query(
                "select price from products where id = ?",
                [item.product_id]
            )

            await connection.query(
                "insert into order_items (order_id,product_id,quantity,price) values (?,?,?,?)",
                [orderId,item.product_id,item.quantity,product[0].price]
            )

            await connection.query(
                "update products set stock = stock - ? where id = ?",
                [item.quantity,item.product_id]
            )
        }

        await connection.commit();

        return {
            message:"order created",
            orderId
        }

    }

    catch(err){

        await connection.rollback();

        throw err;
    }

    finally{

        connection.release();
    }
}
const getOrdersService = async () =>{

    const [orders] = await db.query(
        `select orders.id as order_id,
        users.name as user_name,
        orders.total_amount
        from orders
        
        inner join users on orders.user_id = users.id`
    )
    return orders
}




const getdetailedorderservice = async () =>{
    const [orders] = await db.query(
        `select orders.id as order_id,
        users.name as user_name,
        products.name as product_name,
        order_items.quantity,
        order_items.price
        
        from order_items

        inner join orders
        on order_items.order_id = orders.id

        inner join users
        on orders.user_id = users.id

        inner join products
        on order_items.product_id = products.id
        `
    )
    return orders;
}

const updateorderservice = async(order_id,status) =>{
      const allowedstatus = [
        "pending",
        "paid",
        "shipped",
        "delivered",
        "cancelled"
      ]    
    if(!allowedstatus.includes(status)){
            throw new Error("invalid status")
         }
       
        const [result] = await db.query(
            "select * from orders where id = ?",
            [order_id]
        )
         if(result.length === 0){
            throw new Error(
                "order not exist"
            )
        }
        await db.query(
            "update orders set status = ? where id = ?",
            [status,order_id]
        )
        return {
            message:"order status shipped successfully"
        }
}
module.exports = 
{
    getOrdersService,
    createOrderService,
    getdetailedorderservice,
    updateorderservice
}
