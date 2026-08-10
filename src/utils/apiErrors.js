class ApiErrors extends Error{
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
        this.errors=errors

    }
}

//iskoo is liye bana gaya hai taki jab response  and erro ek hi sytax type jaye 
