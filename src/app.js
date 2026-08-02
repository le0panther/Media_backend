import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app=express();

app.use(cors({     
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
//app.use ka bhi documentation padhna hai 

//iska thoda documentation padhna hai ki what is cors and its other keys and values like mostly origin and credetials
  

app.use(express.json({limit:"16kb"}))
//express.json and body parser iske upper ki bhi documentation thoda padh lena 

app.use(express.urlencoded({extended:true,limit:"16kb"}))
//express.urlencoded bhi padhna hai {with special focus on extended,limit}

app.use(cookieParser())
//iska bhi documentation padhna hai 

app.use(express.static("public"))
//iska bhi documentation padhna hai 






export{app}

