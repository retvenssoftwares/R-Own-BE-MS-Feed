

// const JobData = require('../../models/job');
// const Profile = require('../../models/Profile');
// const Hotel = require('../../models/Hotels');


// module.exports = async (req, res) => {
//   try {
//     const pageSize = 6;
//     const currentPage = parseInt(req.query.page) || 1;
//     const skip = (currentPage - 1) * pageSize;

//     const hotels = await JobData.find({}, 'hotelLogoUrl vendorimg jobTitle hotelRating designationType noticePeriod jobDescription skillsRecq companyName jobType jobLocation jid expectedCTC');
//     const totalPosts = hotels.length;

//     const pagedPosts = hotels.slice(skip, skip + pageSize);

//     if (pagedPosts.length > 0) {
//       res.json([{
//         // page: currentPage,
//         // pageSize,
//         // totalPages: Math.ceil(totalPosts / pageSize),
//         // totalPosts,
//         posts: pagedPosts
//       }]);
//     } else {
//       res.json([{ message: 'You have reached the end' }]);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Something went wrong' });
//   }
// };



const JobData = require('../../models/job');
const Profile = require('../../models/Profile');
const Hotel = require('../../models/Hotels');
const JobStatus = require('../../models/jobApplication');

module.exports = async (req, res) => {
  try {
    const { User_id } = req.params;
    const pageSize = 10;
    const currentPage = parseInt(req.query.page) || 1;
    const skip = (currentPage - 1) * pageSize;

    const hotels = await JobData.find({}, 'hotelLogoUrl vendorimg jobTitle hotelRating designationType noticePeriod jobDescription skillsRecq companyName jobType jobLocation jid expectedCTC display_status').sort({date_added:-1});
    const totalPosts = hotels.length;

    const pagedPosts = hotels.slice(skip, skip + pageSize);

    const jobstatus = await JobStatus.find({ user_id: User_id });
    const profiles = await Profile.find({ User_id });

    const result = pagedPosts.map((job) => {
      const matchingProfile = profiles.find((profile) =>
        profile.saveall_id.Jobs.some((savedJob) => savedJob.jobid === job.jid)
      );

      const matchingStatus = jobstatus.some((status) => status.jid === job.jid);
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

    if (result.length > 0) {
      res.json([{ 
        page: currentPage,
        pageSize,
        posts: result }]);
    } else {
      res.json([{ message: 'You have reached the end' }]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
