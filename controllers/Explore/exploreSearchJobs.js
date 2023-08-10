// const Job = require('../../models/job');

// // GET API endpoint for retrieving posts based on search query with pagination
// module.exports = async (req, res) => {
//   try {
//     const keyword = req.params.keyword; // Assuming the keyword is provided in the request body
//     const pageSize = 6;
//     const page = parseInt(req.query.page) || 1; // Assuming the page number is provided as a query parameter

//     const searchQuery = {
//       $or: [
//         { jobLocation: { $regex: new RegExp(keyword, 'i') } },
//         { companyName: { $regex: new RegExp(keyword, 'i') } },
//         { jobTitle: { $regex: new RegExp(keyword, 'i') } }
//       ],
//       display_status: "1"
//     };

//     const totalPosts = await Job.countDocuments(searchQuery);
//     const totalPages = Math.ceil(totalPosts / pageSize);

//     if(page > totalPages){
//         return res.json([{ message: "You have reached the end" }]);
//     }
//     const pagedPosts = await Job
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

const Job = require('../../models/job');
const Profile = require('../../models/Profile');
const JobStatus = require('../../models/jobApplication');

module.exports = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const User_id = req.params.User_id;
    const pageSize = 6;
    const page = parseInt(req.query.page) || 1;

    const searchQuery = {
      $or: [
        { jobLocation: { $regex: new RegExp(keyword, 'i') } },
        { companyName: { $regex: new RegExp(keyword, 'i') } },
        { jobTitle: { $regex: new RegExp(keyword, 'i') } }
      ],
      display_status: "1"
    };

    const totalPosts = await Job.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalPosts / pageSize);

    if (page > totalPages) {
      return res.json([{ message: "You have reached the end" }]);
    }

    const pagedPosts = await Job
      .find(searchQuery)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({date_added:-1});

    const profiles = await Profile.find({ User_id: User_id });
    const jobstatus = await JobStatus.find({ user_id: User_id });

    const result = pagedPosts.map((job) => {
      // const matchingProfile = profiles.find((profile) =>
      //   profile.saveall_id.Jobs.some((savedJob) => savedJob.jobid === job.jid)
      // );

      const matchingStatus = jobstatus.find((status) => status.jid === job.jid);
      let applyStatus = 'Not Applied';

      if (matchingStatus) {
        applyStatus = 'Applied';
      }

      return {
        ...job.toObject(),
        applyStatus,
        // profileData: matchingProfile ? { User_name: matchingProfile.User_name, Profile_pic: matchingProfile.Profile_pic } : null,
      };
    });

    res.json([{ 
      page,
      pageSize,
      posts: result }]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
