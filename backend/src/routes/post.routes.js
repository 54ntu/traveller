import express from "express";
import upload from "../middleware/multer.middleware.js";
import PostController from "../controllers/post.controllers.js";
import UserMiddleware from "../middleware/user.middleware.js";
const router = express.Router();

router.route("/").post(
  UserMiddleware.isUserLoggedIn,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  PostController.addpost
);

export default router;
