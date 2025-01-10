import { isValidObjectId } from "mongoose";
import User from "../models/user.models.js";
import ApiResponse from "../services/ApiResponse.js";
import generateToken from "../services/tokenservices.js";
import EncryptionDecryption from "../services/userAuth.services.js";

class UserController {
  static async userRegister(req, res) {
    const profile_image = req.file?.filename;
    console.log(req.body);
    const { fullname, email, password, role } = req.body;
    if (!fullname || !email || !password || !role) {
      return res.status(400).json({
        message: "please provide all fields",
      });
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        message: "user with the given email already exists...!!",
      });
    }

    const encryptedpass = await EncryptionDecryption.hashedPassword(password);

    const userdata = await User.create({
      fullname,
      email,
      password: encryptedpass,
      role,
      profile_pic: profile_image,
    });

    const isusercreated = await User.findById(userdata._id).select("-password");
    if (!isusercreated) {
      return res.status(500).json({
        message: "user creation failed!!",
      });
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, isusercreated, "user registered successfully..!!")
      );
  }

  static async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "please enter email or password",
      });
    }

    const isUserexist = await User.findOne({ email });
    if (!isUserexist) {
      return res.status(404).json({
        message: "user with given email doesnot exist",
      });
    }

    //password matched

    const isPasswordMatched = await EncryptionDecryption.comparedPassword(
      isUserexist.password,
      password
    );
    console.log(`ispasswordmatched ${isPasswordMatched}`);

    if (isPasswordMatched) {
      return res.status(403).json({
        message: "password doesnot matched...!",
      });
    }

    const token = await generateToken(isUserexist._id, isUserexist.role);
    console.log(token);
    if (!token) {
      return res.status(500).json({
        message: "error generating token",
      });
    }
    return res
      .status(200)
      .json(new ApiResponse(200, token, "user logged in successfully"));
  }

  static async updateUser(req, res) {
    const id = req.user.id;
    // console.log(id);
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "invalid user id ",
      });
    }
    // console.log(req.user);
    const imagename = req.file?.filename;
    const { fullname, email } = req.body;
    // console.log(fullname, email);
    // console.log(imagename);

    const updateddata = await User.findByIdAndUpdate(id, {
      fullname: fullname,
      email: email,
      profile_pic: imagename,
    });

    const isdataUpdated = await User.findById(updateddata._id).select(
      "-password"
    );

    if (!isdataUpdated) {
      return res.status(500).json({
        message: "data updation failed..!",
      });
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, isdataUpdated, "user data updated successfully")
      );
  }

  static async deleteUser(req, res) {
    const id = req.user.id;
    if (!id) {
      return res.status(400).json({
        message: "invalid id",
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(500).json({
        message: "user deletion failed.!",
      });
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "user deleted successfully...!!"));
  }
}

export default UserController;
