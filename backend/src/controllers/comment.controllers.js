import { isValidObjectId } from "mongoose";
import Comment from "../models/comment.models.js";
import ApiResponse from "../services/ApiResponse.js";
class CommentController {
  static async addComment(req, res) {
    //kun post maa comment garne
    //kasle garne --loggedin gareko user le garne ho
    const { content } = req.body;
    const userid = req.user.id;
    const { postid } = req.params;
    if (!content) {
      return res.status(400).json({
        message: "comment content is required😒😒😒😒",
      });
    }
    if (!isValidObjectId(postid)) {
      return res.status(400).json({
        message: "invalid post id",
      });
    }

    const commentadd = await Comment.create({
      content,
      post: postid,
      owner: userid,
    });

    if (!commentadd) {
      return res.status(500).json({
        message: "comment addition failed😑😑😑😑😑😑",
      });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, commentadd, "comment added successfully..!!"));
  }

  static async updateComment(req, res) {
    //kun comment gareko tyo comment id chahiyo
    //user id verify on that basis available xa ki xaina vanne khojnu paryo first maa
    //if the user is valid then its ok to go with the updation process
    const { content } = req.body;
    const userid = req.user.id;
    const { commentid } = req.params;
    if (!isValidObjectId(commentid)) {
      return res.status(400).json({
        message: "please provide valid comment id.😒😒😒😒😒",
      });
    }

    if (!userid || !commentid) {
      return res.status(400).json({
        message: "please provide userid and commentid  ",
      });
    }

    //verify whether comment with id is available or not and also check whether the comment is belong to the logged in user,, if both case is match then only proceed for the updation
    const updatecomment = await Comment.findOneAndUpdate(
      {
        _id: commentid,
        owner: userid,
      },
      {
        content: content,
      },
      {
        new: true,
      }
    );

    if (!updatecomment) {
      return res.status(500).json({
        message: "comment updation failed😑😑😑😑",
      });
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatecomment,
          "comment updated successfully.😎😎😎😎😎"
        )
      );
  }

  static async getcomment(req, res) {
    const commentdata = await Comment.find();
    return res
      .status(200)
      .json(
        new ApiResponse(200, commentdata, "comment fetched successfully..")
      );
  }
}

export default CommentController;
