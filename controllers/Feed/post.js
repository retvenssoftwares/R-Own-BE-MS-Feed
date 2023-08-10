
const AWS = require('aws-sdk');
const s3 = require('../../utils/url');
const feed = require("../../models/Post");
const Comments = require('../../models/comments');
const Like = require("../../models/feedlikes");
const Profile = require("../../models/Profile");
const FeedCache = require("../../models/feedcache");
const eventdata = require('../../models/events');
const hoteldata = require('../../models/Hotels');
const moment = require('moment-timezone')
const multerS3 = require('multer-s3');
const multer = require('multer');

const upload = multer({
storage: multerS3({
  s3,
  bucket: 'rown-bucket', // Replace with your S3 bucket name
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    cb(null, `post-images/${file.originalname}`);
  },
}),
});

module.exports = async (req, res) => {
  try {
    // Upload each file to DigitalOcean Spaces
    const mediaData = await Promise.all(req.files.map(async (file) => {
      const params = {
        Bucket: 'rown-bucket',
        Key: `post-images/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        acl: 'public-read'
      };
      await s3.upload(params).promise();
      return { post: `https://rown-bucket.s3.amazonaws.com/post-images/${file.originalname}` };
    }));

    // Add current date to each media object
    const mediaWithDate = mediaData.map((mediaObj) => {
      return { ...mediaObj, date_added: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")};
    });

    const hotelid = req.body.hotel_id || null;

    const userProfile = await Profile.findOne({ User_id: req.params.User_id });
    if (!userProfile) {
      return res.status(404).json({ message: "user profile not found" });
    }

    const { Profile_pic, User_name, verificationStatus, normalUserInfo, Full_name,Role } = userProfile;
    const eventid = req.body.event_id;
    const event = await eventdata.findOne({ event_id: eventid });

    const { event_thumbnail = "", price = "", event_start_date = "", event_id = "" } = event || {};

    const hotel = hotelid ? await hoteldata.findOne({ hotel_id: hotelid }) : null;

    const { hotelAddress = null, hotelName = null, hotelLogoUrl = null, hotelCoverpicUrl = null, bookingengineLink = null } = hotel || {};    

    const post = new feed({
      user_id: req.body.user_id,
      caption: req.body.caption,
      likes: req.body.likes || [],
      comments: req.body.comments || [],
      location: req.body.location,
      date_added:moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss"),
      pollQuestion:req.body.pollQuestion,
      post_type: req.body.post_type,
      Can_See: req.body.Can_See,
      Can_comment: req.body.Can_comment,
      Event_location: req.body.Event_location,
      Event_name: req.body.Event_name,
      event_id: event_id,
      checkinLocation: req.body.checkinLocation,
      checkinVenue: req.body.checkinVenue,
      hotel_id: hotelid || null,
      hotelAddress: hotelAddress,
      hotelName: hotelName,
      hotelCoverpicUrl: hotelCoverpicUrl,
      hotelLogoUrl: hotelLogoUrl,
      bookingengineLink: bookingengineLink,
      // pollQuestion: pollQuestionWithDate,
      media: mediaWithDate,
      Profile_pic: Profile_pic,
      User_name: User_name,
      Full_name: Full_name,
      Role:Role,
      event_thumbnail: event_thumbnail,
      price: price,
      event_start_date: event_start_date,
      verificationStatus: verificationStatus,
      jobTitle: normalUserInfo[0]?.jobTitle || userProfile.Role || "Default Job Title"
    });

    // Save the post to the database
    await post.save();
    const { post_id } = post;

    userProfile.post_count.push({ post_id: post_id });
    await userProfile.save();

    const like = new Like({
      user_id: req.body.user_id,
      post_id: post.post_id
    });

    // Save the like to the "likes" collection
    await like.save();

    const comment = new Comments({
      user_id: req.body.user_id,
      post_id: post.post_id
    });

    // Save the comment to the "comments" collection
    await comment.save();

    // Find users with connections
    const users = await Profile.find({ "connections.user_id": req.body.user_id });

    // Add post_id to the feed cache of connected users
    for (let i = 0; i < users.length; i++) {
      const feedData = await FeedCache.findOne({ user_id: users[i].User_id });
      if (feedData) {
        feedData.posts.unshift({ post_id: post.post_id });
        await feedData.save();
      }
    }

    res.status(200).json({ message: 'Post created and added to feed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
