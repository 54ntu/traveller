import multer from "multer";

const Imagestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/images");
  },
  filename: function (req, file, cb) {
    let imagename = Date.now() + file.originalname;
    cb(null, imagename);
  },
});

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/videos");
  },
  filename: function (req, file, cb) {
    let videoname = Date.now() + file.originalname;
    cb(null, videoname);
  },
});

const imageupload = multer({ storage: Imagestorage });
const videoupload = multer({ storage: videoStorage });
export { imageupload, videoupload };
