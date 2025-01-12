import mongoose, { isValidObjectId } from "mongoose";
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

  static async deleteComment(req, res) {
    const { commentid } = req.params;
    // console.log(commentid);
    const userid = mongoose.Types.ObjectId.createFromHexString(req.user.id);

    // console.log(typeof userid);
    if (!isValidObjectId(commentid)) {
      return res.status(400).json({
        message: "please provide valid commentid",
      });
    }

    if (!commentid || !userid) {
      return res.status(400).json({
        message: "please provide valid commentid and userid",
      });
    }

    //CHECK whether the comment with the given comment id is present or not
    const isCommentExist = await Comment.findOne({ _id: commentid });
    if (!isCommentExist) {
      return res.status(404).json({
        message: "comment with given id doesnot found..!!",
      });
    }

    const isCorrectOwner = await Comment.findOne({
      owner: userid,
    });

    if (!isCorrectOwner) {
      return res.status(404).json({
        message: "you are not the owner of this comment",
      });
    }
    //check whether the comment and the user loggedin belongs to that person or not
    const commentdeleted = await Comment.findOneAndDelete({
      _id: commentid,
      owner: userid,
    });

    // console.log(commentdeleted);
    if (!commentdeleted) {
      return res.status(500).json({
        message: "comment deletion failed.😒😒😒😒",
      });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "comment deleted successfully.😂😂😂😂"));
  }

  static async getcomment(req, res) {
    const commentdata = await Comment.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "ownerdetails",
        },
      },
      {
        $unwind: "$ownerdetails",
      },

      {
        $project: {
          fullname: "$ownerdetails.fullname",
          createdAt: "$ownerdetails.createdAt",
          updatedAt: "$ownerdetails.updatedAt",
        },
      },

      {
        $lookup: {
          from: "posts",
          localField: "post",
          foreignField: "_id",
          as: "postdetails",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerinfo",
              },
            },
            {
              $unwind: "$ownerinfo",
            },
          ],
        },
      },
      {
        $unwind: "$postdetails",
      },
      {
        $project: {
          fullname: "$ownerdetails.fullname",
          createdAt: "$ownerdetails.createdAt",
          updatedAt: "$ownerdetails.updatedAt",
          postTitle: "$postdetails.title", // Assuming there's a title field
        },
      },
    ]);
    return res
      .status(200)
      .json(
        new ApiResponse(200, commentdata, "comment fetched successfully..")
      );
  }
}

export default CommentController;
