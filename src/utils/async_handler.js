const asyncHandler=(requestHandler 
    /*This is a funtion*/
)=> async(req,res,next)=>{
    try {
        await requestHandler(req,res,next)
        
    } catch (error) {
        res.status(error.code || 500)
        .json({
            success:false,
            message:error.message
        })
        
    }

}

//asyncHandler ke upper thoda badh lena or usko har line ka matlab bata karo and kya iska importance hai 
export {asyncHandler}