

const Post = require('../../models/Post');
const profile = require('../../models/Profile');
//const moment = require('moment-timezone')
// PATCH 
module.exports = async (req, res) => {
  const { post_id, option_id } = req.params;
  const { user_id } = req.body;
  //const date_added = moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
  try {
    const post = await Post.findOne({ post_id });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const pollQuestion = post.pollQuestion[0]; // Assuming there's only one question

    // Find the option with matching option_id
    const optionIndex = pollQuestion.Options.findIndex(
      (option) => option.option_id === option_id
    );

    if (optionIndex === -1) {
      return res.status(404).json({ message: 'Option not found' });
    }
    const userProfile = await profile.findOne({ User_id: user_id });
    if (!userProfile) {
      return res.status(404).json({ message: 'user  not found' });
    }
    const {Full_name,Role}=userProfile

    const option = pollQuestion.Options[optionIndex];

    // Check if the user_id already exists in the votes array
    const userIndex = option.votes.findIndex((vote) => vote.user_id === user_id);

    if (userIndex !== -1) {
      // User already voted, remove the vote
      option.votes.splice(userIndex, 1);
    } else {
      // User hasn't voted, add the vote
      option.votes.push({ user_id,Full_name,Role});
    }

    await post.save();

    return res.json({ message: 'Option updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
