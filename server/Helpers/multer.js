import multer from 'multer'



const storage = multer.diskStorage({

  destination: (req, file, cb) => {
   
  
    cb(null, "./client/uploads/");
  },
  filename: (req, file, cb) => {
   
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  
  if (file.mimetype.startsWith("image/")) {

    cb(null, true);
  } else {
   
    cb(new Error("Only images are allowed!"), false);
    return res.json({ error: "Only images are allowed!" });
  }
};
const upload = multer({ storage, fileFilter });

export {upload}
