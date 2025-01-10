import express from "express";
import { imageupload, videoupload } from "../middleware/multer.middleware.js";
import PostController from "../controllers/post.controllers.js";
import UserMiddleware from "../middleware/user.middleware.js";
const router = express.Router();

router
  .route("/")
  .post(
    UserMiddleware.isUserLoggedIn,
    imageupload.array("photos", 5),
    videoupload.array("videos", 2),
    PostController.addpost
  );

export default router;
