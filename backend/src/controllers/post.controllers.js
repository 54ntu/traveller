import { isValidObjectId } from "mongoose";
import Post from "../models/post.models.js";
import ApiResponse from "../services/ApiResponse.js";

class PostController {
  static async addpost(req, res) {
    const userid = req.user.id;
    // console.log(req.files);
    // console.log(req.body);
    const photourl = req.files?.photo?.[0]?.filename;
    const videourl = req.files?.video?.[0]?.filename;

    // console.log(photourl);
    // console.log(videourl);

    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        message: "content if required...!!",
      });
    }
    const postdata = await Post.create({
      content,
      photos: photourl,
      videos: videourl,
      owner: userid,
    });

    const ispostcreated = await Post.findById(postdata._id);
    if (!ispostcreated) {
      return res.status(500).json({
        message: "post creation failed.!!",
      });
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          ispostcreated,
          "post created successsfully😎😎😎😎😎"
        )
      );
  }

  static async getAllPost(req, res) {
    const posts = await Post.find();
    if (posts.length === 0) {
      return res.status(404).json({
        message: "posts not found...!!!",
      });
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, posts, "post data fetched successfully.😊😊😊😊")
      );
  }

  static async updatePost(req, res) {
    const userid = req.user.id;
    // console.log(`user id is ${userid}`);
    const { id } = req.params;
    // console.log(id);
    const { content } = req.body;
    const photourl = req.files?.photos?.[0]?.filename;
    const videourl = req.files?.videos?.[0]?.filename;
    const updatedPost = await Post.findOneAndUpdate(
      { _id: id, owner: userid },
      {
        content,
        photos: photourl,
        videos: videourl,
      },
      {
        new: true,
      }
    );
    // console.log(updatedPost);
    if (!updatedPost) {
      return res.status(500).json({
        message: "post updation failed.!",
      });
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedPost, "post updated successfully.😊😊😊😊")
      );
  }

  static async deletepost(req, res) {
    const { id } = req.params;
    const userid = req.user.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "invalid object id",
      });
    }

    const deletedpost = await Post.findOneAndDelete({ _id: id, owner: userid });
    // console.log(deletedpost);
    if (!deletedpost) {
      return res.status(404).json({
        message: "post not found!",
      });
    }
    return res.status(200).json(
      new ApiResponse({
        message: "post deleted successfully..!!",
      })
    );
  }
}

export default PostController;
