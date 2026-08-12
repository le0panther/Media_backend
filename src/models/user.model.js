import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true    
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,    
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true    
        },
        avatar:{
            type:String,    //cloudinary url
            required:true, 
        },
        coverimage:{
            type:String,  //cloudinary url  
        },
        watchHistory:[{
            type:Schema.Types.ObjectId,
            ref:"videos"
                
         }],
        password:{
            type:String,
            //pasword ko as a string format database may store nahi kiya jata kyuki chahe na chahe , vo database se leak ho jata hai ,toh usko encrupt kar ke rakha jata hai , toh aab ye challange hai jisko hum aab solve karege 
            required:[true,"Password is required "]


        },
        refreshToken:{
            type:String
        } 
        //iske upper ka documentation thoda padh lena 

    },
    {
        timestamps:true
    }
)

userSchema.pre("save",async  function (next){
    if(!this.isModified("password")) return next()

    this.password= await bcrypt.hash(this.password,10)
    next()
    
    //password encryption is going on here .
   
})

userSchema.methods.isPasswordCorrect=async function(password){
      return await bcrypt.compare(password,this.password)
}
//In that single line of code, you are giving your userSchema a custom helper method called isPasswordCorrect. When called during login, it checks the incoming plain password against the database's hashed password, and sends back a quick true or false directly to a variable in your controller's memory so it knows whether to allow the user in or reject the login.

userSchema.methods.generateAccessToken=function(){
    //ye jarur padhna ki jap humlog acces or refresh token ko gnerate kar ke .env may add kar chuke hai toh phir ek essa funtion kyu likh rahe hai jaha humko phir se usse generat karna padh raha hai 

    // In .env: You save only the Secret Key (your server’s private master signature/stamp). It stays locked on your server so no one else can forge tokens.

    // In the Function (generateAccessToken): You create the Actual Token (a unique digital identity card containing that specific user's _id, email, and expiration time).

    // Why the function uses the secret: jwt.sign() takes that user's personal details and signs them using the secret from .env. Whenever that user visits later, your server uses the same secret to verify that the token is genuine and hasn't been tampered with.
    return  jwt.sign(
        {
            _id:this.id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return  jwt.sign(
        {
            _id:this.id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

//JWT kya hota hai or kyu use hot hai or may gemini may serch kiya hu dekh lena 
 
export const User=mongoose.model("User",userSchema)
//upper wala line of  export code and normal export code may difference kya hota hai pata kar lena 