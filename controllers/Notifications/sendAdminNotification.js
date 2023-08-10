

const admin = require('firebase-admin');
const serviceAccount = require('../../utils/r-own-d0a2c-firebase-adminsdk-8vi0h-088627958e.json');
const profile = require('../../models/Profile');
const s3 = require('../../utils/url');


module.exports = async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ message: "Please provide title and body in the request" });
  }

  try {
    let mediaUrl;

    if (req.file) {
      const originalFilename = req.file.originalname;
      const filenameWithoutSpaces = originalFilename.replace(/\s+/g, ''); // Remove spaces
      const params = {
        Bucket: 'rown-bucket', // Replace with your S3 bucket name
        Key: `profile-pictures/${filenameWithoutSpaces}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        acl: 'public-read'
      };
      await s3.upload(params).promise();
      mediaUrl = `https://rown-bucket.s3.amazonaws.com/profile-pictures/${filenameWithoutSpaces}`;
    }
    // console.log(mediaUrl)
    const profiles = await profile.find();
    if (!profiles || profiles.length === 0) {
      return res.json({ message: "No profiles found" });
    }

    const batchCount = 20;
    const totalBatches = Math.ceil(profiles.length / batchCount);

    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const batchStart = batchIndex * batchCount;
      const batchEnd = batchStart + batchCount;
      const batchProfiles = profiles.slice(batchStart, batchEnd);

      const notification = {
        data: {
          title: title,
          body: body,
        },
        android: {
          priority: "high",
          notification: {
            imageUrl: mediaUrl,
            title: title,
            body: body
          }
        },
      };

      const responses = await Promise.all(
        batchProfiles.map(async (profileData) => {
          const { device_token } = profileData;
          if (device_token) {
            notification.token = device_token;
            try {
              const response = await admin.messaging().send(notification);
              console.log('Notification sent successfully:', response);
              return response;
            } catch (error) {
              console.error('Error sending notification:', error);
              return null;
            }
          }
        })
      );

      // Delay before sending the next batch
      if (batchIndex < totalBatches - 1) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5 seconds delay
      }
    }

    return res.status(200).json({ message: "Notifications sent successfully" });
  } catch (error) {
    console.error('Error finding profiles:', error);
    return res.status(500).json({ message: "Error finding profiles" });
  }
};
