import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public");
  },
  filename: function (req, file, cb) {
    let imagename = Date.now() + file.originalname;
    cb(null, imagename);
  },
});

const upload = multer({ storage: storage });
export default upload;
