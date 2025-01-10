class PostController {
  static async addpost(req, res) {
    const photourl = req.file?.filename;
    const videourl = req.file?.filename;
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        message: "content is required",
      });
    }
  }
}

export default PostController;
