// "Yes, wrapper functions are used to add additional features or behavior to an existing function without modifying its original code."
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

// "A higher-order function takes a function as a parameter and returns an inner function that executes it. This allows us to easily attach a try/catch block to the inner function, which is the main reason for passing it in."

//asyncHandler ke upper thoda badh lena or usko har line ka matlab bata karo and kya iska importance hai 
export {asyncHandler}