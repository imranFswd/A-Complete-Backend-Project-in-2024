
import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"



/*
**  cloudinary configaration
*/

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});



/*
**  cloudinary upload function
*/

const uploadOnCloudinary = async (localFilePath) => {

  try {
    /*
    **  local file path check
    */

    if (!localFilePath) {
      return null
    }

    
    
    /*
    **  upload the file on cloudinary
    */

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    })



    /*
    **  fale has been uploaded successfully
    */
    
    console.log(`file is uploaded successfully on cloudinary and \n URL is `, response.url);
    console.log("response: ", response);



    /*
    **  file unlink Synchronously
    */

    fs.unlinkSync(localFilePath)



    return response;

  } catch (error) {

    /*
    **  remove the locally saved temporary file as the upload operation got failed
    */

    fs.unlinkSync(localFilePath)



    return null;

  }


}

// console.log("uploadOnCloudinary: ", uploadOnCloudinary);



export { uploadOnCloudinary }



/* reference...

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });


*/


