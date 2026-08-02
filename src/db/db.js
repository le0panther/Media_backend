import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const DB_Connect= async()=>{
    try {
    const connectionInstace= await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)

    console.log(`\n MongoDb connected !! DB HOST: ${connectionInstace}`);
        
    } catch (error) {
        console.log(`Mongo connection error:${error}`)
    }
}


export default  DB_Connect;