  
const like = require('../../models/feedlikes');


module.exports = async (req, res) => {
  try {
    const post = await like.findOne({ post_id: req.params.post_id });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const likeCount = post.likes.length;
    return res.status(200).json({post,likeCount});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};