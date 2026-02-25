import { Op } from "sequelize"
import CategoryModel from "../../../DB/model/Category.model.js"
import productModel from "../../../DB/model/Product.model.js"
import userModel from "../../../DB/model/user.model.js"
import { cloud } from "../../../utils/multer/cloudinary.js"
import { pagination } from "../../../utils/pagination/pagination.js"
import { asyncHandler } from "../../../utils/response/error.response.js"
import successResponse from "../../../utils/response/success.response.js"
import { model } from "mongoose"
//import discountModel from "../../../DB/model/discount.model .js"

const populateList = [
    { model: CategoryModel },
    { model: userModel},
   // {model: discountModel}
]
export const getProducts = asyncHandler(
    async(req, res,next ) => {
        
        const {page, size} =req.query
    const data =  await pagination({
        model :productModel,
        page,
        size,
        populate: populateList
    })
        return successResponse({ res, data: {data} })
})

export const getProduct = asyncHandler(async (req, res, next) => {
    const { productId } = req.params
    const product = await productModel.findByPk(productId, {
    include: [
    {
        model: CategoryModel,
        as: 'Category',
    },
    {
        model: userModel,
        as: 'User',
    },],
})
    if (!product) {
    return next(new Error('not found this product'))
    }
    return successResponse({ res, data: { product } });
})

export const filterProducts = asyncHandler(async (req, res, next) => {
    const { page, size, categoryId, name , is_new, minPrice, maxPrice, onSale } = req.query
    const filter = {}
    if (is_new !== undefined) {
        filter.is_new = (is_new === 'true' || is_new === '1');
    }
    if (categoryId) filter.categoryId = categoryId;
    if (name) {
    filter.name = { [Op.like]: `%${name}%` }
    }
    if (minPrice || maxPrice) {
        filter.base_price = {};
        if (minPrice) filter.base_price[Op.gte] = minPrice;
        if (maxPrice) filter.base_price[Op.lte] = maxPrice;
    }
    if (onSale === 'true') {
        filter.discount_price = { [Op.not]: null }
    }
    const data = await pagination({
    model: productModel,
    filter,
    size,
    page,
    sort: { createdAt: -1 },
    populate: populateList
    })
    return successResponse({ res, data: data.result, meta: { count: data.count, page: data.page, size: data.size } })
})

export const updateProduct =asyncHandler(async(req, res, next) =>{
    const {productId }=req.params
    if(req.files?.length) {
        const allImages= []
        for (const file of req.files) {
            const {secure_url, public_id}= await cloud.uploader.upload(file.path,{folder: "e-Commerce/Product"})
            allImages.push({secure_url, public_id})
        }
        req.body.main_image = allImages[0].secure_url;
        req.body.attachments = allImages.slice(1);
        }
        if (req.body.size) req.body.size = JSON.parse(req.body.size);
        if (req.body.color) req.body.color = JSON.parse(req.body.color);
        const user = await userModel.findOne({where:{id: req.user.id}})
        if (!user) {
            return next(new Error("not found any user with this id "))
        }
        if (user.role !== 'admin') {
        return next(new Error(" not authorized"))
    }
        const product =  await productModel.findOne({ where: { id: productId } });
        if (!product) {
        return next(new Error("not found any product with this id "))
    }
    if (req.body.categoryId) {
        const category = await CategoryModel.findOne({ where: { id: req.body.categoryId } });
        if (!category) {
        return next(new Error("Category not found"));
        }
    }
    await product.update(req.body);
    return successResponse({res , data:{product}})
})

export const createProduct= asyncHandler(async(req, res, next) =>{
    const {name, color,description, categoryId , base_price, is_new, discount_price, size } = req.body
    const user = await userModel.findOne({ where: { id: req.user.id } })
    if (!user || (user.role !== 'admin')) {
    return next(new Error("Not authorized to create a product"))
    }
    const category = await CategoryModel.findOne({ where: { id: categoryId } });
    if (!category) {
        return next (new Error("not found"))
    }
    const allImages =[]
    for (const file of  req.files) {
        const {secure_url, public_id}= await cloud.uploader.upload(file.path,{folder: "e-commerce/product"})
        allImages.push({secure_url, public_id})
    }
    const main_image = allImages[0].secure_url;
    const attachments = allImages.slice(1);
    const product = await productModel.create({
        name,
        discount_price,
        base_price,
        description,
        categoryId ,
        main_image ,
        attachments,
        created_by: req.user.id,
        size: size ? JSON.parse(size) : [],
        color: color ? JSON.parse(color) : [],
        is_new,
    })
    return successResponse({res , data:{product}})
})

export const deleteProduct = asyncHandler(async(req, res, next) =>{
    const {id } =req.params
    const user = await userModel.findOne({ where: { id: req.user.id } });
    if (!user) {
    return next(new Error("User not found"));
    }
    if (user.role !== 'admin') {
    return next(new Error("Not authorized. Only Admin can delete a product"));
    }
    const product = await productModel.findByPk(id);
    if (!product) {
        return next(new Error("not found any product with this id"))
    }
    await product.destroy();
    return successResponse({res})
})









// export const createProducts= asyncHandler(async(req, res, next) =>{
//     const {name, color, brand, length, width, categoryId , isAccept , quantity, userId, sellPrice } = req.body
//     const user = await userModel.findOne({ where: { id: userId } })
//     if (!user || (user.role !== 'Admin' && user.role !== 'vendor')) {
//     return next(new Error("Not authorized to create a product"))
//     }
//     const category = await CategoryModel.findOne({ where: { id: categoryId } });
//     if (!category) {
//         return next (new Error("not found"))
//     }
//     const attachments =[]
//     for (const file of  req.files) {
//         const {secure_url, public_id}= await cloud.uploader.upload(file.path,{folder: "e-commerce/product"})
//         attachments.push({secure_url, public_id})
//     }
//     const product = await productModel.create({name, color, quantity, brand, length, width, categoryId , isAccept, attachments })
//     if (user.role == 'vendor') {
//     await UserProductsModel.create({
//     userId,
//     productId: product.id,
//     quantity,
//     sellPrice
//     })
// }
//     return successResponse({res , data:{product}})
// })

// export const updateProducts =asyncHandler(async(req, res, next) =>{
//     const {productId, userId }=req.params
//     if(req.files?.length) {
//         const attachments= []
//         for (const file of req.files) {
//             const {secure_url, public_id}= await cloud.uploader.upload(file.path,{folder: "E-Commerce/Product"})
//             attachments.push({secure_url, public_id})
//         }
//         req.body.attachments= attachments
//         }
//         const user = await userModel.findOne({where:{id: userId}})
//         if (!user) {
//             return next(new Error("not found any user with this id "))
//         }
//         if (user.role !== 'admin') {
//         return next(new Error(" not authorized"))
//     }
//         const product =  await productModel.findOne({ where: { id: productId } });
//         if (!product) {
//         return next(new Error("not found any product with this id "))
//     }
//     if (req.body.categoryId) {
//         const category = await CategoryModel.findOne({ where: { id: req.body.categoryId } });
//         if (!category) {
//         return next(new Error("Category not found"));
//         }
//     }
//     await product.update(req.body);
//     return successResponse({res , data:{product}})
// })

// export const updateUserProducts = asyncHandler(async (req, res, next) => {
//     const { quantity, sellPrice, productId, userId } = req.body;
//     const userProduct = await UserProductsModel.findOne({
//     where: {
//     productId,
//     userId,
//     },
// })
//     if (!userProduct) {
//     return next(new Error('You are not allowed to update this product or it does not exist.'));
//     }
//     const product=  await UserProductsModel.update({quantity, sellPrice}, {
//     where: {
//     productId,
//     userId,
//     },
// })
//     return successResponse({ res, message: 'Product updated successfully', data: product });
// })

// export const joinProductAsVendors = asyncHandler(async (req, res, next) => {
//     const { userId, productId, quantity,sellPrice} = req.body;
//     const user = await userModel.findOne({ where: { id: userId } });
//     if (!user) {
//     return next(new Error('User not found'));
//     }
//     const product = await productModel.findOne({ where: { id: productId } });
//     if (!product) {
//     return next(new Error('Product not found'));
//     }
//     const existingUserProduct = await UserProductsModel.findOne({ where: { userId, productId }})
//     if (existingUserProduct) {
//     return next(new Error('Vendor has already joined this product'));
//     }
//     const userProduct = await UserProductsModel.create({
//     userId,
//     productId,
//     quantity,
//     sellPrice,
//     })
//     return successResponse({res, message: 'Product successfully added to vendor\'s products',data: userProduct})
// })