//models
const post  = require("../../models/Post");

module.exports= async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const user_id = req.body.user_id;

    // Find the post using the post_id
    const Post = await post.findOne({ post_id: post_id });
    if (!Post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Add the new user_id to the saved_post array
    const newComment = { user_id};
    Post.saved_post.push(newComment);

    // Update the post in the database
    await Post.save();

    return res.status(200).json({ message: 'user_id saved successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};