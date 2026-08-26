import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiErrors.js";
import { asyncHandler } from "../utils/async_handler.js";
import jwt from "jsonwebtoken";



export const verifyJWT = asyncHandler(async(req,res,next)=>{
   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
     //token ke under humlog accesstoken ko bhar diye likin kiska access token ko bhar diye 
 
     if(!token ){
         throw new ApiError(401,"Unauthorized request ")
     }
 
     const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
 
     const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
 
     if(!user ){
         // TODO : discuss about frontend 
         throw new ApiError(401,"Invalid Access Token ")
     }
 
     req.user=user;
     next()
   } catch (error) {
    throw new ApiError(4001,error?.message || "Invalid Access Token ")
    
   }

})