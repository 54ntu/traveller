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
  }
}

export default CommentController;
