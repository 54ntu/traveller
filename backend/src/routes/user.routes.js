import express from "express";
import UserController from "../controllers/user.controllers.js";
import upload from "../middleware/multer.middleware.js";
import UserMiddleware from "../middleware/user.middleware.js";
const router = express.Router();

router
  .route("/register")
  .post(upload.single("profile"), UserController.userRegister);

router.route("/login").post(UserController.login);

router
  .route("/update")
  .patch(
    UserMiddleware.isUserLoggedIn,
    upload.single("profile"),
    UserController.updateUser
  );

router
  .route("/delete")
  .delete(UserMiddleware.isUserLoggedIn, UserController.deleteUser);

export default router;
