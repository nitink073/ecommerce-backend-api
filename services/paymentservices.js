const db = require("../db")

const createpaymentservice = async(order_id,amount,payment_method) =>{
    const [result] = await db.query(
        `insert into payments
        (
        order_id,
        amount,
        payment_method
        )
        values(?,?,?)
        `,
        [order_id,amount,payment_method]
    )
    return result
}

module.exports = {createpaymentservice}