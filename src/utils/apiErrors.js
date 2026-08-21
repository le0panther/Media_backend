class ApiError extends Error{
    constructor( 
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""
    ){
        super(message)          //super and super ka parameters ke bare may thoda padh lena 
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false;
        this.stack=stack            
        //stack ke bare may bhi thoda padhn lena or stack ka isme last line nahi likha hu usko dekhn ke add karlena
        this.errors=errors

    }
}

export {ApiError}
//iskoo is liye bana gaya hai taki jab response  and erro ek hi sytax type jaye 
