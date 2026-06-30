const joi = require("joi");

const createproductschema = joi.object({
    name: joi.string().required(),

    description: joi.string().allow(""),

    price: joi.number().positive().required(),

    stock: joi.number().min(0).required(),

    category_id: joi.number(),

    image_url: joi.string()
})

module.exports = createproductschema