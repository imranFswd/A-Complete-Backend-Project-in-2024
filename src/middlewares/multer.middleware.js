


import multer from "multer";



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + file.originalname + '-' + uniqueSuffix)
      // cb(null, `${file.fieldname}-${file.originalname}-${uniqueSuffix}`)
    }
  })

  // console.log("storage: ", storage);



export const upload = multer({ storage })


