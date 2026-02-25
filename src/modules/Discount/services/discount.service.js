// import discountModel from "../../../DB/model/discount.model .js";
// import productModel from "../../../DB/model/Product.model.js";
// import { pagination } from "../../../utils/pagination/pagination.js";
// import { asyncHandler } from "../../../utils/response/error.response.js";
// import successResponse from "../../../utils/response/success.response.js";
// import cron from 'node-cron';
// import { Op } from 'sequelize';

// export const createDiscount = asyncHandler(async(req, res, next)=>{
//     const { user } = req
//     const discount = await discountModel.create( {...req.body, userId: user.id})
//     return successResponse({res, data:{ discount}})
// })

// export const updateDiscount = asyncHandler(async (req, res, next) => {
//     const { discountId } = req.params
//     const discount = await discountModel.findOne({ where: { id: discountId } })
//     if (!discount) {
//         return next(new Error("Discount not found"))
//     }
//     await discount.update(req.body)
//     return successResponse({ res, data: { discount } })
// })

// export const deleteDiscount = asyncHandler(async (req, res, next) => {
//     const { discountId } = req.params
//     const discount = await discountModel.findOne({ where: { id: discountId } })
//     if (!discount) {
//         return next(new Error("Discount not found"))
//     }
//     await productModel.update(
//         { discountId: null },
//         { where: { discountId: discount.id } }
//     )
//     await discount.destroy()
//     return successResponse({ res, data: { message: "Discount deleted successfully" } })
// })

// export const getAllDiscounts = asyncHandler(async (req, res, next) => {
//     const { page, size } = req.query

//     const data = await pagination({
//         model: discountModel,
//         page,
//         size,
//         populate: [{
//             model: productModel
//         }]
//     })
//     return successResponse({
//         res,
//         data: { data }
//     })
// })

// export const getDiscountById = asyncHandler(async (req, res, next) => {
//     const { discountId } = req.params

//     const discount = await discountModel.findByPk(discountId,{
//         include: [{
//             model: productModel
//         }]
//     })
//     if (!discount) {
//         return next(new Error("Discount not found", { cause: 404 }))
//     }
//     return successResponse({
//         res,
//         data: { discount }
//     })
// })

// export const removeDiscountFromProduct = asyncHandler(async (req, res, next) => {
//     const { productId } = req.params
//     const product = await productModel.findByPk(productId)
//     if (!product) {
//         return next(new Error("Product not found"))
//     }
//     await product.update({ discountId: null })

//     return successResponse({
//         res,
//         data: { message: "Discount removed from product successfully", product }
//     })
// })

// export const cleanExpiredDiscounts = () => {
//     cron.schedule('0 * * * *', async () => {
//         console.log('Checking for expired discounts...')
//         const now = new Date()
//         const expiredDiscounts = await discountModel.findAll({
//             where: {
//             endDate: { [Op.lte]: now }
//             }
//         })
//         if (expiredDiscounts.length === 0) {
//             console.log('No expired discounts found.')
//             return
//         }
//         for (const discount of expiredDiscounts) {
//             await productModel.update(
//                 { discountId: null },
//                 { where: { discountId: discount.id } }
//             )
//             await discount.destroy()
//         console.log(`Expired discount with ID ${discount.id} cleaned and removed.`)
//         }
//         console.log(`Total expired discounts cleaned: ${expiredDiscounts.length}`)
//     })
// }

