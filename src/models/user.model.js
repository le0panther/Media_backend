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
    if(this.isModified("password")) return next()

    this.password= await bcrypt.hash(this.password,10)
    
    
    
   
})

userSchema.methods.isPasswordCorrect=async function(password){
      return await bcrypt.compare(password.this.password)
}

userSchema.methods.generateAccessToken=function(){
    //ye jarur padhna ki jap humlog acces or refresh token ko gnerate kar ke .env may add kar chuke hai toh phir ek essa funtion kyu likh rahe hai jaha humko phir se usse generat karna padh raha hai 
    return  jwt.sign(
        {
            _id:this.id,
            email:this.email,
            username:this.email,
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


export const User=mongoose.model("User",userSchema)