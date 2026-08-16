// "Yes, wrapper functions are used to add additional features or behavior to an existing function without modifying its original code."

//ye jo code hai isme hu, kuch additional features add on kiye hai agar vo repeat ho raha hoga parameters ke fetures  ke sath toh dekh lena 

const asyncHandler = (requestHandler)=>{
    //(req,res,next) se pehle return like hai chai aur code may lekin humlog nahi likhe hai toh dekh lena 
     return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch(
            (err)=> next (err)
        )
        
    }
}

// "A higher-order function takes a function as a parameter and returns an inner function that executes it. This allows us to easily attach a try/catch block to the inner function, which is the main reason for passing it in."

//asyncHandler ke upper thoda badh lena or usko har line ka matlab bata karo and kya iska importance hai 
export {asyncHandler}