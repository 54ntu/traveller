import Post from "../models/post.models.js";

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

    console.log(postdata);
  }
}

export default PostController;
