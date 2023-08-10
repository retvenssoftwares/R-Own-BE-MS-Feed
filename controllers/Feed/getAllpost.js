
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

module.exports = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({date_added:-1});
    const profiles = await Profile.find({});
    
    const result = [];
    for (let i = 0; i < posts.length; i++) {
      for (let j = 0; j < profiles.length; j++) {
        if (posts[i].user_id === profiles[j].User_id) {
          result.push({ post: posts[i], profile: profiles[j] });
          break;
        }
      }
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

