import {asyncHandler } from "../utils/async_handler.js";
import { ApiError } from "../utils/apiErrors.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";


const generateAccessAndRefreshTokens = async(userId)=>{
        try {
             const user= await User.findById(userId) 
             const accessToken=user.generateAccessToken()
             const refreshToken=user.generateRefreshToken()
             
             user.refreshToken = refreshToken
             await user.save({validateBeforeSave : false})

             return {accessToken , refreshToken}   
        } catch (error) {
                 console.log("Error",error)
               throw new ApiError(500,"Somewent Wrong while generating refresh and access token") 
              
        }
}

const registerUser = asyncHandler(async (req ,res )=>{
        //get user deatails form frontend
        //validation - not empty
        //check if user already exists : username , email
        //check for images , check for avatar
        //create user object - create entry in db 
        //remove password and refresh token field from response
        //check for user creation
        //return response 

       const {fullName,email,username,password} =req.body
       //req.body ke through raw/json or text data aata hai 
       console.log("email: ",email)     //checking whether the data is received or not 

       if(fullName == ""){
        throw new ApiError(400,"fullname is required ")
       }
       //ab essse hi sab fields ke liye check karna hai 
       //lekin iska ek easy approach bhi hota hai 

       if (
        [fullName,email,username,password].some((field)=>{
                const fields=field?.trim()==""
                return fields
        })
        // yaha ka logic kuch essa hai ki ek array banaye or usme hum log values dal diye phir usko humlog some ke sath check kar rahe hai ki agar isme se koi bhi ek chij some ke anddar ke callback ko satify karega toh field true de dega ,some bus first match tak chalega 
       )
        {
                throw new ApiError(400,"values needed")
       }


       const existedUser = await User.findOne({
        $or: [ {username} , {email} ]
       })

       if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
       }


       //req.body express deta hai taki aap req.body ke sath khel pao waisehi multer aapko req.files deta hai 

       const avatarLocalPath=req.files?.avatar[0]?.path;
       let coverImageLocalPath;

       if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ){
        coverImageLocalPath= req.files.coverImage[0].path
       }


       if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required ")
       }

       const avatar = await uploadOnCloudinary(avatarLocalPath)
       const coverImage = await uploadOnCloudinary(coverImageLocalPath)

       if(!avatar){
        throw new ApiError(400,"Avatar not found ")
       }


       const user = await User.create({
                fullName,
                avatar:avatar.url,
                coverImage:coverImage?.url || " " ,
                email,
                password,
                username:username.toLowerCase()       
       })

       const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
       )

       if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering a user ")
       }


       return res.status(201).json(
         new ApiResponse(200,createdUser,"User Registed Succesfully "

         ))




})

const loginUser= asyncHandler(async(req,res)=>{
       // req body->data
       // username or email 
       // find the user 
       // password check 
       // access and refresh token 
       // send cookies 
        
       const {email,username,password} = req.body
       //req.body se required data nikal rahe hai 

       if (!username && !email) {
                throw new ApiError(400,"Username or email is required ")
       }
       //if condition laga ke check kar rahe hai ki kya  usernname or email humpe empty/ aaya hai ki nahi form req.body

       const user = await User.findOne({
        $or:[{username},{email}]
       })
       //findOne method ka user kar ke username and email ke basis may user ko find kar rahe hai 

       if (!user) {
        throw new ApiError(400,"User does not exists ")  
       }
       //if condition daal ke check kar rahe hai ki agar user mila hi nahi toh kya karna hai / throw an error if no user found 

       const isPasswordValid=await user.isPasswordCorrect(password )
       //user ne jo password send kiya hai hum usko bcrypt ke through check kar rahe hai ki vo correct hai ki nahi 

       if(!isPasswordValid){
        throw new ApiError(401,"Invalid Credentials ")
       }
       // if condition daal ke phir error throw kar rahe hai agar vo galat hai 

        const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)
        //generateAccessAndRefreshToken ke through hum log Access and Refresh token genrate karege 

//lekin kyuki GAaRT bahut baar use hogo toh usko tu utils may dal ke export mar de 

        const loggedInUser= await User.findById(user._id).select("-password -refreshToken")
       //ye step ko phir se dekh lena 
       //video 15 ka 28 minutes se suru karna 

       const options = {
        httpOnly : true,
        secure : true
       }
       //jab bhi hum cookies bhejte hai toh tab hum logo ko pehle kuch options design karne padhnte hai cookies ke 

       // options kuch nahi hota hai , options bus ek object hot hai cookies ke liye 

       //Options se hota kya hai ki by default cookies ko koi bhi modify kar sakta hai frontend may  lekin jab humlog httpOnly and secure ko true karte hai tab ye modified nahi ki ja sakti bus server issse modify and access kar sakta hai 

       return res
       .status(200)
       .cookie("accessToken",accessToken,options )
       .cookie("refreshToken",refreshToken,options)
       .json(
        new ApiResponse(
                200,
                {
                        user:loggedInUser,
                        accessToken,
                        refreshToken
                }
                //jab hum log all ready user ko accesstoken and refresh token bhej chuke the toh ab phir response may kyu bhej rahe hai 

                //video 15 ,32 min may explanation hai dekh lena 

                , "User logged in Successfully "



       ))



})

const logoutUser=asyncHandler(async(req,res)=>{
        //User.findById

        //ab dekho jab hum log logout karte hai toh humko uer kuchh data send nahi karta hai toh hum kese specific user ko find kare or use logout kare 

        //toh humlog yaha pe (custom) middleware ka concept use karege 

        //hum kya karege , hum ek essa middleware likhege jo ek essa method pehle use karega jisme usser ka data hoga phir logout ko run kara dege or kiyuki ye back to back hoga with the help of next toh logoutUser ko data mil jayega 

        //agar just upper wala line / comment samajh nahi aaya hoga toh video 15 ka 50 yah end wla part / logout wala part dekh lena 

        await User.findByIdAndUpdate(
                req.user._id,
                {
                        $set:{
                                refreshToken:undefined 
                        }
                },
                {
                        new:true
                }
        )//upper wale code ka reference hum ek variable may bhi store kar sakte hai , hitesh sir store nahi kare hai toh may dekh luga 

        //refresh token clear kar diye hai with the help of  upper wale code 


        const options = {
        httpOnly : true,
        secure : true
       }

       return res
       .status(200)
       .clearCookie("accessToken",options)
       .clearCookie("refreshToken",options)
       .json(new ApiResponse(200,{},"User logged Out "))

})

const refreshAccessToken = asyncHandler(async(req,res)=>{
        const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken

        if(!incomingRefreshToken){
                throw new ApiError(401,"Unauthorized request ")
                //Unauthorized isliye bole kyuki humara token hi sahi nahi hai 
        }

        try {
                //ye step (jwt verify step ,i mean jwt verify karna important kyu hai  )
        
                const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        
                const user = await User.findById(decodedToken?._id)
        
                if(!user){
                        throw new ApiError(401,"Invalid Refresh Token ")
                }
        
        
                if(incomingRefreshToken != user?.refreshToken){
                        throw new ApiError(401,"Refresh Token is expired or used ")
                }
        
                const options ={
                        httpOnly:true,
                        secure:true
                }
        
               const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
        
                return res
                .status(200)
                .cookie("accessToken" , accessToken , options)
                .cookie("refreshToken", newRefreshToken , options)
                .json(
                        new ApiResponse(200,
                                {accessToken,refreshToken:newRefreshToken},
                                "Access Token refreshed successfully"
                        )
                )
        
        } catch (error) {
                throw new ApiError(401,error?.message || "Invalid refresh Token  ")       
        }
   

})

export {
        registerUser,
        loginUser,
        logoutUser,
        refreshAccessToken
}
//.some() returns true as soon as it finds at least one element that satisfies the condition.



