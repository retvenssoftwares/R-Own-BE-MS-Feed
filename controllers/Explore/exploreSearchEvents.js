// const Event = require('../../models/events');

// // GET API endpoint for retrieving posts based on search query with pagination
// module.exports = async (req, res) => {
//   try {
//     const keyword = req.params.keyword; // Assuming the keyword is provided in the request body
//     const pageSize = 15;
//     const page = parseInt(req.query.page) || 1; // Assuming the page number is provided as a query parameter

//     const searchQuery = {
//       $or: [
//         { location: { $regex: new RegExp(keyword, 'i') } },
//         { event_title: { $regex: new RegExp(keyword, 'i') } },
//         { event_category: { $regex: new RegExp(keyword, 'i') } }
//       ],
//       display_status: "1"
//     };

//     const totalPosts = await Event.countDocuments(searchQuery);
//     const totalPages = Math.ceil(totalPosts / pageSize);

//     if(page > totalPages){
//         return res.json({ message: "You have reached the end" });
//     }
//     const pagedPosts = await Event
//       .find(searchQuery)
//       .skip((page - 1) * pageSize)
//       .limit(pageSize);

//     res.json([{
//       // page,
//       // pageSize,
//       // totalPages,
//       // totalPosts,
//       posts: pagedPosts
//     }]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Something went wrong' });
//   }
// };

const Event = require('../../models/events');
const Profile = require('../../models/Profile');
const saved = require('../../models/saved');
// GET API endpoint for retrieving posts based on search query with pagination
module.exports = async (req, res) => {
  try {
    const keyword = req.params.keyword; // Assuming the keyword is provided in the request body
    const pageSize = 10;
    const page = parseInt(req.query.page) || 1; // Assuming the page number is provided as a query parameter

    const searchQuery = {
      $or: [
        { location: { $regex: new RegExp(keyword, 'i') } },
        { event_title: { $regex: new RegExp(keyword, 'i') } },
        { event_category: { $regex: new RegExp(keyword, 'i') } }
      ],
      display_status: "1"
    };

    const totalPosts = await Event.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalPosts / pageSize);

    if (page > totalPages) {
      return res.json([{ message: "You have reached the end" }]);
    }

    const pagedPosts = await Event
      .find(searchQuery)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({date_added:-1});

    const profileData = await Profile.findOne({ User_id: req.params.User_id });
    const save = await saved.findOne({ user_id: req.params.User_id });

    const result = await Promise.all(
      pagedPosts.map(async (post) => {
        let saved = 'not saved';

        if (save) {
          const savedPosts = save.saveall_id.Events;
          const isSaved = savedPosts.some((savedPost) => savedPost.eventid.toString() === post.event_id.toString());
          saved = isSaved ? 'saved' : 'not saved';
        }

        return {

          // category_name: post ? post.category_name : null,
          // User_name: profileData ? profileData.User_name : null,
          // Full_name: profileData ? profileData.Full_name : null,
          // Profile_pic: profileData ? profileData.Profile_pic : null,
          // category_name: post.category_name,
          User_name: post.User_name,
          Full_name: post.Full_name,
          Profile_pic: post.Profile_pic,
          verificationStatus: post.verificationStatus,
          event_title: post.event_title,
          event_start_date: post.event_start_date,
          event_id: post.event_id,
          event_thumbnail: post.event_thumbnail,
          display_status: post.display_status,
          event_description: post.event_description,
          location: post.location,
          event_category: post.event_category,
          price: post.price,
          saved: saved,
        };
      })
    );

    res.json([{
      page,
      pageSize,
      // totalPages,
      // totalPosts,
      posts: result
    }]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
