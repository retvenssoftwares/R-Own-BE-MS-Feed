

const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

module.exports = async (req, res) => {
  try {
    const post_id = req.params.post_id;

    const post = await Post.findOne({ post_id: post_id }).select('pollQuestion');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const pollQuestion = post.pollQuestion;

    const userIds = pollQuestion.flatMap(question =>
      question.Options.flatMap(option =>
        option.votes.map(vote => vote.user_id)
      )
    );

    // console.log(userIds)

    const profiles = await Profile.find({ User_id: { $in: userIds } });

    const profileMap = profiles.reduce((map, profile) => {
      map[profile.User_id] = profile;
      return map;
    }, {});
    const responseData = pollQuestion.map(question => {
      const options = question.Options.map(option => {
        const votes = option.votes.map(vote => {
          const { user_id } = vote;
          const profile = profileMap[user_id];    
          return {
            user_id,
            profile_pic: profile ? profile.Profile_pic : '',
            job_title: profile && profile.normalUserInfo.length > 0 
              ? profile.normalUserInfo[0].jobTitle
              : '',
            Full_name: profile ? profile.Full_name : '',
            Role: profile ? profile.Role : '',
            Verification_status: profile ? profile.verificationStatus : ''
          };
        });
        return { ...option.toObject(), votes };
      });
      return { ...question.toObject(), Options: options };
    });

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

