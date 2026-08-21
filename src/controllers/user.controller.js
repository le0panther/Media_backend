import {asyncHandler } from "../utils/async_handler.js";
import { ApiError } from "../utils/apiErrors.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";





const registerUser=asyncHandler(async (req ,res )=>{
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
                field?.trim()==""
                return field
        })
        // yaha ka logic kuch essa hai ki ek array banaye or usme hum log values dal diye phir usko humlog some ke sath check kar rahe hai ki agar isme se koi bhi ek chij some ke anddar ke callback ko satify karega toh field true de dega ,some bus first match tak chalega 
       )
        {
                throw new ApiError(400,"values needed")
        
       }


       const existedUser = User.findOne({
        $or: [ {username} , {email} ]
       })

       if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
       }


       //req.body express deta hai taki aap req.body ke sath khel pao waisehi multer aapko req.files deta hai 

       const avatarLocalPath=req.files?.avatar[0]?.path;
       const coverImageLocalPath=req.files?.coverImage[0]?.path;

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

export {registerUser}

//.some() returns true as soon as it finds at least one element that satisfies the condition.
