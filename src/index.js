import dotenv from "dotenv";
import DB_Connect from "./db/db.js";
import {app} from './app.js';



dotenv.config({
    path:'./.env'
})

console.log("dotenv done")


DB_Connect()
.then(()=>{
    app.listen(process.env.PORT || PORT,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log(`DB connection failed !!!`,error)
});









/*
import express from "express"
const app=express()

;(async()=>{
    try {
        await  mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error",()=>{
            console.log("error:",error)
             throw error
         })
        
        app.listen(process.env.PORT,()=>{
            console.log(`he app is listening on the Port ${process.env.PORT}`)
        })

         
    } catch (error) {
        console.error("Error:",error);
        throw err
        
    }

})
//iife chalu karne se pahle hamesa ; laga dena kyuki kya pata hum issse pahle ko iife ko close karna bhul gaye hoge 
()
*/
