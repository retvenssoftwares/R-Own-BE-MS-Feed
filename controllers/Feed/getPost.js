//models path
const feed  = require("../../models/Post");

module.exports= async (req, res) => {
    try {
      const post = await feed.findOne({ post_id: req.params.post_id });
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };