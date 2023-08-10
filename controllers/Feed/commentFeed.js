
const shortid = require('shortid');

//models
const feed = require("../../models/comments");
const Post =require('../../models/Post');
const profile = require('../../models/Profile');
const notifications = require('../../models/notificationSchema');
const Notify = require('../../models/notification');
const admin = require('firebase-admin');
const servAcc = require('../../utils/firebase');
const moment = require('moment-timezone')
module.exports = async (req, res) => {
  const { post_id } = req.params;
  const { User_id, comment } = req.body;
  const comment_id = shortid.generate();
 const date_added = moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")

  try {
    const post = await feed.findOne({ post_id });
    if (!post) {
      return res.status(404).json({ message: 'comment not found' });
    }
    const { user_id } = post;
  
    const userpost = await Post.findOne({ post_id });
    if (!userpost) {
      return res.status(404).json({ message: 'post not found' });
    }
    const { media,post_type } = userpost;

    const receiverPost = await profile.findOne({ User_id: user_id });
    if (!receiverPost) {
      return res.status(404).json({ message: 'receiver post not found' });
    }

    const { device_token } = receiverPost;

    const userProfile = await profile.findOne({ User_id: User_id });
    if (!userProfile) {
      return res.status(404).json({ message: 'user profile not found' });
    }

    const { Profile_pic, User_name,Full_name,verificationStatus, Role } = userProfile;
    const newComment = {
      user_id: userProfile.User_id,
      body: `${Full_name} commented on your post`,
      comment,
      Media:media[0]?.post || "",
      post_id,
      post_type,
      Profile_pic,
      verificationStatus,
      User_name: User_name,
      Full_name:Full_name,
      comment_id,
      date_added,
      Role: Role,
    };

    post.comments.push(newComment);
    await post.save();

    let totalComments = post.comments.length;

    const notify = await notifications.findOne({ user_id: user_id });

    if (device_token && (User_id != user_id)) {
      let notificationBody = '';

      if (totalComments === 1) {
        notificationBody = `${Full_name} commented on your post`;
      } else {
        notificationBody = `${Full_name} and ${totalComments-1} other people commented on your post`;
      }

      const notification = {
        token: device_token,
        data: {
          title: 'New Comment',
          body: notificationBody,
          type: "comment",
          post_id: post_id,
          postType: post_type
        },
        android:{
          priority:"high"
        }, 
        apns: {
          payload: {
            "aps" : {
              "alert" : {
                  "title" : "New Comment",
                  "body" : notificationBody
              }
            },
            "notificationType": "comment",
            "postID": post_id,
            "postType": post_type,
          }
        },
      };

      try {
        const response = await admin.messaging().send(notification);
        console.log('Notification sent successfully:', response);
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    }

    if (User_id != user_id && notify) {
      notify.notifications.commentNotification.push(newComment);
      await notify.save();

      // Check if the length exceeds 2
      if (notify.notifications.commentNotification.length >=2) {
        const poppedItems = notify.notifications.commentNotification.splice(0, 2);

        const existingNotify = await Notify.findOne({ user_id: user_id });
        if (existingNotify) {
          existingNotify.notifications.commentNotification.unshift(...poppedItems);
          await existingNotify.save();

           // Remove popped items from notificationsCache
           notify.notifications.commentNotification.splice(0, poppedItems.length);
           await notify.save();
        } else {
          const newNotify = new Notify({
            user_id: user_id,
            notifications: {
              commentNotification: poppedItems,
            },
          });
          await newNotify.save();
        }
      }
    } else {
      const newNotification = new notifications({
        user_id: user_id,
        notifications: {
          commentNotification: [newComment],
        },
      });
      await newNotification.save();
    }

    return res.json({ message: 'comment added successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
