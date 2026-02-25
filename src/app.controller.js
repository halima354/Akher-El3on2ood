import express from "express"
import cors from "cors"
import authController from './modules/auth/auth.controller.js'
import productController from './modules/product/product.controller.js'
import categoryController from './modules/category/category.controller.js'
import { globalErrorHandling } from './utils/response/error.response.js'

const bootstrap = (app) => {

  app.use(express.json())
  app.use(cors())

  app.get("/", (req, res) => {
    return res.status(200).json({
      message: "Welcome in node.js project powered by express and ES6"
    })
  })

  app.use("/product", productController)
  app.use("/category", categoryController)
  app.use("/auth", authController)

  app.all("*", (req, res) => {
    return res.status(404).json({ message: "In-valid routing" })
  })

  app.use(globalErrorHandling)
}

export default bootstrap











































// import path from "node:path"
// import dotenv from 'dotenv'
// dotenv.config({path : path.resolve("./src/config/.env.prod")})
// // dotenv.config({path : path.resolve("./src/config/.env.dev")})
// import { connectionDB, syncDB } from './DB/connection.js'
// console.log("Dialect:", process.env.DB_DIALECT)
// console.log("User:", process.env.DB_USER)
// import authController from './modules/auth/auth.controller.js'
// import productController from './modules/product/product.controller.js'
// import  categoryController from './modules/category/category.controller.js'
// import cors from 'cors'
// //import discountController from './modules/Discount/discount.controller.js'
// import { globalErrorHandling } from './utils/response/error.response.js'
// //import { cleanExpiredDiscounts } from "./modules/Discount/services/discount.service.js"

// const bootstrap = (app) => {
//     app.use(express.json())
//     app.use(cors())
//     app.get("/", (req, res, next) => {
//         return res.status(200).json({ message: "Welcome in node.js project powered by express and ES6" })
//     })
//     app.use("/product", productController)
//     app.use("/category", categoryController)
//    // app.use("/discount",discountController)
//     app.use("/auth", authController)
    
//     app.all("*", (req, res, next) => {
//         return res.status(404).json({ message: "In-valid routing" })
//     })
//     app.use(globalErrorHandling)
// // connectionDB()
// // syncDB()
// //cleanExpiredDiscounts()
// }
// export default bootstrap