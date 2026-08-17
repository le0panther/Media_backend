import {asyncHandler } from "../utils/async_handler.js";





const registerUser=asyncHandler(async (req ,res )=>{
        //get user deatails form frontend
        //validation - not empty
        //check if user already exists : username , email
        //check for images , check for avatar 
        //create user object - create entry in db 
        //remove password and refresh token field from response
        //check for user creation
        //return response 


})

export {registerUser}

//.some() returns true as soon as it finds at least one element that satisfies the condition.
