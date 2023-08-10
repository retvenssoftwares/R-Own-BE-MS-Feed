
  
const Post = require('../../models/comments');
const Profile = require('../../models/Profile');

module.exports = async (req, res) => {
  try {
    const post = await Post.findOne({ post_id: req.params.post_id });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const commentCount = post.comments.length;
   
    
    return res.status(200).json({post,commentCount});
    
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

