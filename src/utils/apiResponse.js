class ApiResponse {
    constructor(
        statusCode,
        data="",
        message="Sucess",
    ){
        this.statusCode=statusCode
        this.message=message
        this.data=data
        this.success=statusCode < 400
    }
}


//iskoo is liye bana gaya hai taki jab response  and erro ek hi sytax type jaye 