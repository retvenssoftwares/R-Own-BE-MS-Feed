



// const services = require('../../models/service');
// const servicename = require('../../models/brandservices');
// const profile = require('../../models/Profile');
// const review = require('../../models/userReviewsdetails');
// module.exports = async (req, res) => {
//   try {
//     const pageSize = 6;
//     const page = parseInt(req.query.page) || 1;
//     const skip = (page - 1) * pageSize;

//     // Fetch unique user_ids from the services collection
//     const uniqueUserIds = await services.distinct('user_id');

//     const result = [];

//     // Iterate over the unique user_ids
//     for (const userId of uniqueUserIds) {
//       // Find the latest event for each unique user_id
//       const event = await services.findOne({ user_id: userId }).sort({ _id: -1 });

//       if (event) {
//         const matchingProfile = await profile.findOne({ User_id: userId }, 'User_id User_name Profile_pic location vendorInfo');
//         const matchingCategory = await servicename.findOne({ serviceId: event.serviceId }, 'service_id service_name');

//         const defaultProfile = {
//           User_name: null,
//           Profile_pic: null,
//           location: null,
//           vendorInfo: {
//             vendorImage: null,
//             vendorName: null,
//             vendorServices: [
//               {
//                 vendorServiceId: null,
//                 serviceId: null,
//                 service_name: null
//               }
//             ]
//           }
//         };

//         const { User_name, Profile_pic, location, vendorInfo } = matchingProfile || defaultProfile;
//         const { vendorImage, vendorName, vendorServices } = vendorInfo || defaultProfile.vendorInfo;

//         result.push({
//           ...event.toObject(),
//           User_name,
//           Profile_pic,
//           location,
//           vendorImage,
//           vendorName,
//           vendorServices
//         });
//       }
//     }

//     const paginatedResults = result.slice(skip, skip + pageSize);

//     if (paginatedResults.length > 0) {
//       res.json([{
//         page,
//         pageSize,
//         vendors: paginatedResults
//       }]);
//     } else {
//       res.json([{ message: 'You have reached the end' }]);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Something went wrong' });
//   }
// };



const services = require('../../models/service');
const servicename = require('../../models/brandservices');
const profile = require('../../models/Profile');
const review = require('../../models/userReviewsdetails');

module.exports = async (req, res) => {
  try {
    const pageSize = 6;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * pageSize;

    // Fetch unique user_ids from the services collection
    const uniqueUserIds = await services.distinct('user_id');

    const result = [];

    // Iterate over the unique user_ids
    for (const userId of uniqueUserIds) {
      // Find the latest event for each unique user_id
      const event = await services.findOne({ user_id: userId },'user_id vendorServicePrice Profile_pic User_name vendorName vendorImage location display_status').sort({date_added: -1 });

      if (event) {
        const matchingProfile = await profile.findOne(
          { User_id: userId },
          'User_id User_name Profile_pic location vendorInfo'
        );
        const matchingCategory = await servicename.findOne(
          { serviceId: event.serviceId },
          'service_id service_name'
        );

        const defaultProfile = {
          User_name: null,
          Profile_pic: null,
          location: null,
          vendorInfo: {
            vendorImage: null,
            vendorName: null,
            vendorServices: [
              {
                vendorServiceId: null,
                service_name: null
              }
            ]
          }
        };

        const { User_name, Profile_pic, location, vendorInfo } = matchingProfile || defaultProfile;
        const { vendorImage, vendorName, vendorServices } = vendorInfo || defaultProfile.vendorInfo;
      
        
        // Calculate average Rating_number for specific record
        const reviewData = await review.findOne({ User_id: userId });
        let averageRating = 0;
        if (reviewData) {
          const { userReviews } = reviewData;
          if (userReviews.length > 0) {
            const ratings = userReviews.map((review) => parseInt(review.Rating_number, 10));
            const sum = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            averageRating = sum / ratings.length;
          }
        }
        result.push({
          ...event.toObject(),
          User_name,
          Profile_pic,
          location,
          vendorImage,
          vendorName,
          vendorServices,
          averageRating // Include averageRating in the result
        });
      }
    }

    const paginatedResults = result.slice(skip, skip + pageSize);

    if (paginatedResults.length > 0) {
      res.json([
        {
          page,
          pageSize,
          vendors: paginatedResults
        }
      ]);
    } else {
      res.json([{ message: 'You have reached the end' }]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
