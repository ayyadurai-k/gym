import connectDatabse from "./config/connectDatabase.js";
import dotenv from 'dotenv'
import admins from './data/admins.json' assert {type:"json"}
import products from './data/products.json' assert {type:"json"}
import { log } from "console";
import Admin from "./models/adminMdl.js";
import { hashPassword } from "./utils/password.js";
import Product from "./models/productMdl.js";
dotenv.config()

connectDatabse();
async function seedAdmins() {
    try {
        await Admin.deleteMany();
        await Product.deleteMany()
        log("All Admins and Products Are Deleted..!")
        for(let i=0;i<admins.length;i++){
            admins[i].password =await hashPassword(admins[i].password) 
        }
        await Admin.insertMany(admins)
        await Product.insertMany(products)
        log("All Admins and Products Are Inserted..!")
    }
    catch(error){
        log(error.message)
    }
    process.exit()
}
seedAdmins();