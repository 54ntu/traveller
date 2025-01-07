import mongoose from "mongoose";
import { userRole } from "../globals/index.js";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
    },
    role: {
      type: String,
      enum: [userRole.Admin, userRole.User],
      default: userRole.User,
    },
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
