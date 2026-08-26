import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET

});
console.log(process.env.CLOUDINARY_API_KEY)                    

async function checkConnection() {
  try {
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary Connected Successfully!", result);
    // Expected output: { status: 'ok' }
  } catch (error) {
    console.error("❌ Cloudinary Connection Failed:", error.message);
  }
}

checkConnection();

const uploadOnCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath) return null
        //upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //The file has been uploaded successfully.
       //console.log("The file is uploaded successfully in the cloudinary .",response.url);
       fs.unlinkSync(localFilePath)
       return response;
    }catch(error){
        fs.unlinkSync(localFilePath)
        //remove the locally saved temporary file as the upload operation got failed 

    }
}


export{uploadOnCloudinary}

//Named Export (export { router }): Requires using the exact same name inside curly braces (or using as to rename it).


    