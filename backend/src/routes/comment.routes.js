import express from "express";
import CommentController from "../controllers/comment.controllers.js";
import UserMiddleware from "../middleware/user.middleware.js";

const router = express.Router();

router
  .route("/:postid")
  .post(UserMiddleware.isUserLoggedIn, CommentController.addComment);

router
  .route("/:commentid")
  .patch(UserMiddleware.isUserLoggedIn, CommentController.updateComment)
  .delete(UserMiddleware.isUserLoggedIn, CommentController.deleteComment);

router
  .route("/")
  .get(UserMiddleware.isUserLoggedIn, CommentController.getcomment);

export default router;
