import jwt from "jsonwebtoken";
import { envConfig } from "../config/config.js";
class UserMiddleware {
  static async isUserLoggedIn(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        status: "error",
        message: "token must be needed",
      });
    }

    const decodedToken = await jwt.verify(token, envConfig.jwtsecretkey);
    req.user = decodedToken;
    next();
  }

  static async isAdmin(req, res, next) {
    if (!req.user) {
      return res.status(403).json({
        status: "error",
        message: "user role is required!!",
      });
    }

    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({
        message: "you are permitted to perform this task",
      });
    }
  }
}

export default UserMiddleware;
