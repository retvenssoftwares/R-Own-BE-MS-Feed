
const feed = require('../../models/feedlikes');
const Post =require('../../models/Post');
const profile = require('../../models/Profile');
const notificationsCache = require('../../models/notificationSchema');
const Notify = require('../../models/notification');
const admin = require('firebase-admin');
const servAcc = require('../../utils/firebase');
const moment = require('moment-timezone')
module.exports = async (req, res) => {
  const { post_id } = req.params;
  const { User_id } = req.body;
  const date_added = moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")

  try {
    const post = await feed.findOne({ post_id });
    if (!post) {
      return res.status(404).json({ message: 'post not found' });
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

    const { Profile_pic, User_name, Full_name,verificationStatus,normalUserInfo, Role  } = userProfile;

    const newlike = {
      Profile_pic,
      Media:media[0]?.post || "",
      post_id,
      post_type,
      Full_name,
      date_added,
      Role,
      verificationStatus,
      User_name: User_name,
      jobTitle:normalUserInfo[0]?.jobTitle || userProfile.Role || "Default Job Title",
      user_id: userProfile.User_id,
      body: `${Full_name} liked your post`
    };

    const requestfound = post.likes.some((data) => data.user_id === User_id);
   
    const notifyCache = await notificationsCache.findOne({ user_id: user_id });
  
    if (requestfound) {
      post.likes = post.likes.filter((request) => request.user_id !== User_id);
      await post.save();
      userProfile.Liked_post = userProfile.Liked_post.filter((post) => post.post_id !== post_id);
      await userProfile.save();
      return res.json({ message: 'not liked' });
    } else {
      post.likes.push(newlike);
      await post.save();
      userProfile.Liked_post.push({ post_id });
      await userProfile.save();

      if (device_token && !requestfound &&(User_id != user_id)) {
        const notification = {
          token: device_token,
          data: {
            title: 'New Like',
            body: `${Full_name} liked your post`,
            type:"like",
            post_id:post_id,
            postType: post_type
          },
          android:{
            priority:"high"
          }, 
          apns: {
            payload: {
              "aps" : {
                "alert" : {
                    "title" : "New Like",
                    "body" : `${Full_name} liked your post`
                }
              },
              "notificationType": "like",
              "postID": post_id,
              "postType": post_type
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

      if (User_id != user_id && notifyCache) {
        notifyCache.notifications.likesNotification.push(newlike);
        await notifyCache.save();

        // Check if the length exceeds 2
        if (notifyCache.notifications.likesNotification.length >= 2) {
          const poppedItems = notifyCache.notifications.likesNotification.splice(0, 2);

          const notify = await Notify.findOne({ user_id: user_id });
          if (notify) {
            notify.notifications.likesNotification.unshift(...poppedItems);
            await notify.save();

            // Remove popped items from notificationsCache
            notifyCache.notifications.likesNotification.splice(0, poppedItems.length);
            await notifyCache.save();
          } else {
            const newNotify = new Notify({
              user_id: user_id,
              notifications: {
                likesNotification: poppedItems
              }
            });
            await newNotify.save();

            // Remove popped items from notificationsCache
            notifyCache.notifications.likesNotification.splice(0, poppedItems.length);
            await notifyCache.save();
          }
        }
      } else {
        const newNotificationCache = new notificationsCache({
          user_id: user_id,
          notifications: {
            likesNotification: [newlike]
          }
        });
        await newNotificationCache.save();
      }

      return res.json({ message: 'like added successfully' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
