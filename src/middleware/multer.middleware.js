import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {//destination :The folder to which the file has been saved 
    //cb full-form CallBack
    cb(null, './public/temp')   //cb ka first parameters null kyu hai 
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


//Multer ka documentation padhna hai 
//Multer ka last ka 8 minutes fir se dekhna hai 


//  What is the differcne betwen export {storage} and export const upload = multer({ 
//     storage,
//  })
// for this code 