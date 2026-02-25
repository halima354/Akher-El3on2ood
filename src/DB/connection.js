import  {Sequelize} from "sequelize"
import dotenv from 'dotenv';
import path from "node:path";
dotenv.config({ path: path.resolve("./src/config/.env.prod") });
export const sequelize =new Sequelize(process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 22696,
        dialect: "mysql",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
        }
    },
    logging: false
    })
export const connectionDB= async ()=>{
    await sequelize.authenticate().then(res=>{
        console.log(" connect to DB");
        
    }).catch(err=>{
        console.error("fail to connect ");
    })
}
export const syncDB= async()=>{
    await sequelize.sync({alter: false}).then(res=>{
        console.log(" connect to DB");
    }).catch(err=>{
        console.log(err);
        console.error("fail to connect ");
        
    })
}






