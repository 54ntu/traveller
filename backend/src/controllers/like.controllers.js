import { isValidObjectId } from "mongoose";
import Like from "../models/like.model.js";
import ApiResponse from "../services/ApiResponse.js";
import mongoose from "mongoose";

class LikeController {
  static async toggleLike(req, res) {
    const userid = req.user.id; //loggedin user who is going to or liked the post
    const { postid } = req.params; //post on which user is going to like

    // console.log(userid);
    // console.log(postid);

    //check whether the post id is valid or not

    if (!isValidObjectId(postid)) {
      return res.status(400).json({
        message: "please provide valid post id",
      });
    }

    //check whether the same person has already liked that post or not

    const existedLike = await Like.findOne({
      post: postid,
      likedBy: userid,
    });

    // console.log(existedLike);
    if (existedLike) {
      await Like.findByIdAndDelete(existedLike._id);
      return res.status(200).json({
        message: "unliked successfully.!!",
      });
    } else {
      await Like.create({
        post: postid,
        likedBy: userid,
      });
      return res
        .status(201)
        .json(new ApiResponse(201, "post liked successfully!!"));
    }
  }

  static async getLikedPost(req, res) {
    //get all the post liked by specific person || jwt token

    const userid = new mongoose.Types.ObjectId(req.user.id); // Convert to ObjectId
    console.log(typeof userid);

    const aggregateLikedPost = await Like.aggregate([
      {
        $match: {
          likedBy: userid,
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
                as: "owner",
              },
            },
            {
              $unwind: "$owner",
            },
            {
              $project: {
                fullname: 1,
                email: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$postdetails",
      },
      //   {
      //     $project: {
      //       "photos.url": 1,
      //       "videos.url": 1,
      //       content: 1,
      //       owner: {
      //         fullname: 1,
      //         email: 1,
      //       },
      //     },
      //   },
    ]);

    console.log(aggregateLikedPost);
  }
}

export default LikeController;
