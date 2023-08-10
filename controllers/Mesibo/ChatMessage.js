




const admin = require('firebase-admin');
const serviceAccount = require('../../utils/r-own-d0a2c-firebase-adminsdk-8vi0h-088627958e.json');
const profile = require('../../models/Profile');


module.exports = async (req, res) => {
  if (!req.params.User_id) {
    return res.status(400).json({ message: "Please provide a User_id" });
  } 
 
  try {
const User_id = req.params.User_id;
    const profiledata = await profile.findOne({ User_id: User_id });//receiver
    if (!profiledata || User_id === '') {
      return res.status(404).json({ message: "receiver profile not found" });
    }
const user_id = req.body.user_id;
    const sender = await profile.findOne({User_id: user_id})//sender
    if(!sender || user_id === ''){
      return res.status(404).json({ message: "sender profile not found or it is invalid" });
    }

    const { device_token, role} = profiledata || {};
    const { Mesibo_account} = sender || {};

    const address = Mesibo_account[0].address

    if (!device_token) {
      return res.status(404).json({ message: "Device token not found" });
    }

    // Get the registration tokens from the request body
    const title = req.body.title;
    const body = req.body.body;

    

    const notification = {
      token: device_token,
     
      data:{
        title: `${title}`,
        body: `${body}`,
        address:address,
        type:"message"
      },
      android:{
        priority:"high"
      },
      apns: {
        payload: {
          "aps" : {
            "content-available": 1,
            "alert" : {
                "title" : `${title}`,
                "body" : `${body}`
            }
          },
          "notificationType": "message",
          "userAddress": address,
        }
      },
    };
    
      
    // Send the message to each token in the array
    try {
      const response = await admin.messaging().send(notification);
      console.log('Notification sent successfully:', response);
      if (response) {
        return res.status(200).json({ message: "Notification sent successfully" });
      } else {
        throw new Error("Error sending notification");
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      return res.status(500).json({ message: "Error sending notification" });
    }
  } catch (error) {
    console.error('Error finding profile:', error);
    return res.status(500).json({ message: "Error finding profile" });
  }
};
