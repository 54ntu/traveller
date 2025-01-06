import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
};
