import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {//destination :The folder to which the file has been saved 
    //cb full-form CallBack
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) { //The name of the File within the destination 
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
    console.log(file.fieldname + '-' + uniqueSuffix);
  }
})                         

 export const upload = multer({ 
    storage,
 })


//  What is the differcne betwen export {storage} and export const upload = multer({ 
//     storage,
//  })
// for this code 