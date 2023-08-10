// const AWS = require('aws-sdk');
// const multer = require('multer');
// const profile = require('../../models/Profile')
// const s3 = require('../../utils/url');
// const feed = require("../../models/Post");
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// module.exports = async (req, res) => {
//   try {
    
//     const filter = { post_id: req.params.post_id };
//     const dinfPost = await feed.findOne({post_id});
//     const {user_id} = dinfPost
//     const findProfile = await profile.findOne({User_id:user_id});
//     const update = {
//         caption: req.body.caption,
//         location: req.body.location,
//         display_status:req.body.display_status,
//         Can_See: req.body.Can_See,
//         Can_comment: req.body.Can_comment
//     };

//     const options = { new: true };
//     const updatedpost = await feed.findOneAndUpdate(filter, update, options);


//     res.send({ message: 'User post updated successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: 'Something went wrong' });
//   }
// };



const AWS = require('aws-sdk');
const multer = require('multer');
const profile = require('../../models/Profile');
const feed = require("../../models/Post");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = async (req, res) => {
  try {
    const post_id = req.params.post_id
    const filter = { post_id: post_id };
    const dinfPost = await feed.findOne({ post_id });
    const { user_id } = dinfPost;
    const findProfile = await profile.findOne({ User_id: user_id });

    const update = {
      caption: req.body.caption,
      location: req.body.location,
      display_status: req.body.display_status,
      Can_See: req.body.Can_See,
      Can_comment: req.body.Can_comment
    };

    const options = { new: true };
    const updatedPost = await feed.findOneAndUpdate(filter, update, options);

    if (findProfile && req.body.display_status === '0') {
      const updatedPostCount = findProfile.post_count.filter((post) => post.post_id !== req.params.post_id);

      await profile.findOneAndUpdate(
        { User_id: user_id },
        { post_count: updatedPostCount }
      );
    }

    res.status(200).send({ message: 'User post updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Something went wrong' });
  }
};





