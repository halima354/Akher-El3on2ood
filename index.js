import express from "express"
import path from "node:path"
import dotenv from "dotenv"
import bootstrap from "./src/bootstrap.js"
import { connectionDB, syncDB } from "./src/DB/connection.js"

dotenv.config({
    path: path.resolve("./src/config/.env.prod")
})

const app = express()

await connectionDB()
await syncDB()

bootstrap(app)

export default app












































































































































// import  bootstrap  from './src/app.controller.js'
// import  express  from 'express'
// const app = express()
// //const port = process.env.PORT || 5000
// bootstrap(app , express)
// export default app
// // app.listen(port, () => console.log(`Example app listening on port ${port}!`))