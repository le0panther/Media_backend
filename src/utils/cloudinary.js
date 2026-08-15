import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_sECRET

});                    

const uploadOnCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath) return null
        //upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //The file has been uploaded successfully.
       console.log("The file is uploaded successfully in the cloudinary .",response.url);
       return response;
    }catch(error){
        fs.unlinkSync(localFilePath)
        //remove the locally saved temporary file as the upload operation got failed 

    }
}


export{uploadOnCloudinary}


    