import joi from 'joi'
const parseJsonArray = (value, helpers) => {
    try {
        if (typeof value === 'string') {
            return JSON.parse(value);
        }
        return value;
    } catch (e) {
        return helpers.error('any.invalid');
    }
};
export const createProduct = joi.object().keys({
    name : joi.string().min(4).max(50).trim().required(),
    base_price: joi.number().min(0).max(500000),
    discount_price: joi.number().min(0).less(joi.ref('base_price')).optional(),
    size: joi.custom(parseJsonArray).message("Size must be a valid array").default([]),
    color: joi.custom(parseJsonArray).message("Color must be a valid array").default([]),
    is_new: joi.boolean().default(true),
    file: joi.object().options({allowUnknown: true}),
    description: joi.string().min(3).max(50000).trim(),
    categoryId: joi.number().integer().required(),
}).required()

export const updateProduct = joi.object().keys({
    productId: joi.number().integer().required(),
    name: joi.string().min(4).max(50).trim(),
    description: joi.string().min(3).max(50000).trim(),
    base_price: joi.number().min(0),
    discount_price: joi.number().min(0).less(joi.ref('base_price')),
    size: joi.custom(parseJsonArray).optional(),
    color: joi.custom(parseJsonArray).optional(),
    categoryId: joi.number().integer(),
    is_new: joi.boolean(),
    file: joi.object().options({allowUnknown: true}),
}).required()

export const deleteProduct = joi.object().keys({
    id: joi.number().integer().required(),
}).required()

export const getProduct =  joi.object().keys({
    productId: joi.number().integer().required(),
}).required()

export const filterProducts = joi.object({
    name : joi.string().min(4).max(50).trim(),
    categoryId: joi.number().integer(),
    minPrice: joi.number().min(0),
    maxPrice: joi.number().min(0),
    is_new: joi.string().valid('true', 'false', '1', '0'),
    onSale: joi.string().valid('true', 'false'),
    page: joi.number().integer().min(1),
    size: joi.number().integer().min(1)
}).required()