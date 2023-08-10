const shortid = require('shortid');
//models
const feed  = require("../../models/comments");
const profile = require('../../models/Profile')
const moment = require('moment-timezone')
module.exports= async (req, res) => {
  const post_id = req.params.post_id;
  const { user_id, comment, parent_comment_id } = req.body;
  const comment_id = shortid.generate();
  const date_added = moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")

  try {
    const post = await feed.findOne({ post_id });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userProfile = await profile.findOne({ User_id: user_id });
    if (!userProfile) {
      return res.status(404).json({ message: "user profile not found" });
    }

    
    // Find the parent comment and push the new reply
    let parentComment = post.comments.find(comment => comment.comment_id === parent_comment_id);
    if (!parentComment) {
      return res.status(404).json({ message: "Parent comment not found" });
    }

    // Add the new reply to the parent comment
    const { Profile_pic, User_name,Full_name, Role,verificationStatus } = userProfile;
    const newReply = { user_id, comment, comment_id, Profile_pic, User_name: User_name, Full_name: Full_name, parent_comment_id, Role: Role,date_added:date_added,verificationStatus:verificationStatus };
    parentComment.replies.push(newReply);
    await post.save();

    return res.json({ message: "Reply added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
