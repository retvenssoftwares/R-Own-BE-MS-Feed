


const Profile = require('../../models/Profile')
const admin = require('firebase-admin');
const servAcc = require('../../utils/firebase');
const moment = require('moment-timezone');
const notifications = require('../../models/notification')
module.exports = async (req, res) => {
    try {
     
      // Update the job Application 
      const {User_id} = req.params;//receiver
      const {user_id} = req.body;//sender
      const receiverProfile = await Profile.findOne({User_id: User_id});
      const {device_token} = receiverProfile;      
      const notify = await notifications.findOne({ user_id: User_id });
      const senderProfile = await Profile.findOne({User_id: user_id});
      const {Full_name, Profile_pic} = senderProfile;


           if (device_token) {
            let notificationBody = `${Full_name} is trying to call you` ;  
            const date_added = moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
            const newCall = {            
              Full_name,
              user_id: senderProfile.User_id,
              date_added: date_added,
              Profile_pic:Profile_pic,
              body: notificationBody,
            };
            // if (notify) {
            //   notify.notifications.CallNotifications.unshift(newCall);
            //   await notify.save();
            // } else {
            //   const newNotification = new notifications({
            //     user_id: user_id,
            //     notifications: {
            //         CallNotifications: [newCall],
            //     },
            //   });
            //   await newNotification.save();
            // }
        
            const notification = {
              token: device_token,
              data: {
                title: 'Calling....',
                body: notificationBody,
                type:"call"
              },
              android:{
                priority:"high"
              },
              apns: {
                payload: {
                  "aps" : {
                    "content-available": 1,
                    "alert" : {
                        "title" : "Calling....",
                        "body" : notificationBody
                    }
                  },
                  "notificationType": "Call",
                }
              },
            };
        
            try {
              const response = await admin.messaging().send(notification);
              console.log('Notification sent successfully:', response);
              return res.status(200).json({message: 'Notification sent successfully'})
            } catch (error) {
              console.error('Error sending notification:', error);
              return res.status(500).json({message: 'Error sending notification'})
            }
          }        
        
          
      
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Something went wrong' });
    }
  };
  


