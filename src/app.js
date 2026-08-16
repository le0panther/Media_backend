import express from "express";
import cookieParser from "cookie-parser";      
//cookie-parser converts the cookies form the user side into a javascript object or easy operations
import cors from "cors";


const app=express();

app.use(cors({     
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

// app.use() is basically a command/instruction to Express:
    //"From now on, use this middleware in the request handling process."

//app.use ka bhi documentation padhna hai 

//iska thoda documentation padhna hai ki what is cors and its other keys and values like mostly origin and credetials
  

app.use(express.json({limit:"16kb"}))
//What this does is it takes the incoming request or the data form the user and puts the json data which it receives form the user and put it in req.body
//if it exceeds the limit error will pop up 

//express.json and body parser iske upper ki bhi documentation thoda padh lena 

app.use(express.urlencoded({extended:true,limit:"16kb"}))
//"So, urlencoded works just like express.json() but it is used to handle HTML form data, converting it and saving it into req.body."
// The extended option is a boolean switch (true or false) that chooses the text-decoding library.extended: false: Uses Node's built-in querystring library. It only parses simple strings and numbers, not arrays or nested objects.extended: true: Uses the qs library. It handles complex, deeply nested objects and arrays.

//express.urlencoded bhi padhna hai {with special focus on extended,limit}

app.use(cookieParser())
//iska bhi documentation padhna hai 

app.use(express.static("public"))
// "In simple terms, express.static serves static files from my server so users can view them in their browsers."
//iska bhi documentation padhna hai 




// routes import 
import userRouter from "./routes/user.routes.js"


//routes declaration
app.use("/api/v1/users",userRouter)




export{app}

