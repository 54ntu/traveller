import jwt from "jsonwebtoken";
import { envConfig } from "../config/config.js";

const generateToken = async (id, role) => {
  const token = jwt.sign({ id, role }, envConfig.jwtsecretkey, {
    expiresIn: envConfig.jwtexpiresin,
  });

  return token;
};

export default generateToken;
