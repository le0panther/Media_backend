class ApiErrors extends Error{
    constructor( 
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false;
        this.stack=stack
        this.errors=errors

    }
}

//iskoo is liye bana gaya hai taki jab response  and erro ek hi sytax type jaye 
