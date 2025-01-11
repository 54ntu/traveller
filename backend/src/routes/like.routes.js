import express from "express";
import UserMiddleware from "../middleware/user.middleware.js";
import LikeController from "../controllers/like.controllers.js";
const router = express.Router();

router
  .route("/:postid")
  .post(UserMiddleware.isUserLoggedIn, LikeController.toggleLike);
router
  .route("/")
  .get(UserMiddleware.isUserLoggedIn, LikeController.getLikedPost);

export default router;
