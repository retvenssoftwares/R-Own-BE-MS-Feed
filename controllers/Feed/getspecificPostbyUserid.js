//models path
const feed  = require("../../models/Post");

module.exports= async (req, res) => {
    try {
      const post = await feed.findOne({ user_id: req.params.user_id }).sort({date_added:-1});
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };