

const File = require('../../models/feedcache');
const Posts = require('../../models/Post');
const Likes = require('../../models/feedlikes');
const Comments = require('../../models/comments');
const Profile = require('../../models/Profile');
const saved = require('../../models/saved');
const Blog = require('../../models/blogs');
const Hotel = require('../../models/Hotels');
const Community = require('../../models/userGroup');
const Service = require('../../models/service');
const Admin = require('../../models/adminPost');
const moment = require('moment-timezone');
const userLocks = {}; // Object to store user locks

let requestCount = 0;

module.exports = async (req, res) => {
  const { user_id } = req.params;
  const pageSize = 10;
  const skip = 0; // Fetch the first 10 posts always
  const save = await saved.find({ user_id });

  // Check if the user already has a lock
  if (userLocks[user_id]) {
    return res.status(429).json({ message: 'Too many requests' });
  }

  // Create a lock for the user
  userLocks[user_id] = true;

  try {
    let file = await File.findOne({ user_id });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Get the current date
    const currentDate = moment().tz("Asia/Calcutta").format("DD-MM-YYYY");

    // Set isFetched to "true" and whenWhatched to current time for all records
    // const currentDate = moment().tz("Asia/Calcutta").format("YYYY-MM-DD");

    file.posts.forEach((post) => {
      if (!post.whenWhatched) {
        post.isFetched = "true";
        post.whenWhatched = currentDate;
      }
    });

    // Save the updated file
    await file.save();


    // Filter out posts with adminPostId and whenWhatched date not matching current date
    file.posts = file.posts.map(post => {
      const postDate = moment(post.whenWhatched, "DD-MM-YYYY").tz("Asia/Calcutta").format("DD-MM-YYYY");
   

      if(post.adminPostId && post.whenWhatched){
        if(currentDate !== postDate) {
          return {
            ...post,
            adminPostId: undefined
          };
        }
             }
             return post;

      // if (post.adminPostId && postDate !== currentDate) {
      //   return {
      //     ...post,
      //     adminPostId: undefined
      //   };
      // }

      // return post;
    });

    const { posts } = file;
    const totalPosts = posts.length;

    if (totalPosts === 0) {
      // Fetch random data (blogs, hotels, communities, services) when there are no posts
      const [randomBlogs, randomHotels, randomCommunities, randomServices] = await Promise.all([
        Blog.aggregate([{ $sample: { size: 5 } }]),
        Hotel.aggregate([{ $sample: { size: 5 } }]),
        Community.aggregate([{ $match: { community_type: 'Open Community' } }, { $sample: { size: 5 } }]),
        Service.aggregate([{ $sample: { size: 5 } }])
      ]);

      // Prepare data for blogs
      const blogs = randomBlogs.map(blog => {
        const { blog_id, blog_title, blog_content, blog_image, category_name, _id, Profile_pic, User_name, category_id, User_id, likes, comments } = blog;
        const like = likes.some(like => like.user_id === user_id) ? 'liked' : 'not liked';
        const matchingSavedBlog = save.find(profile =>
          profile.saveall_id.Blogs.some(savedBlog => savedBlog.blogid === blog.blog_id)
        );
        const saved = matchingSavedBlog ? 'saved' : 'not saved';

        return { blog_id, blog_title, blog_content, blog_image, category_name, _id, Profile_pic, User_name, category_id, User_id, likes, comments, like, saved };
      });

      // Prepare data for hotels
      const hotels = randomHotels.map(hotel => {
        const { hotel_id, hotelName, hotelAddress, hotelRating, hotelLogoUrl, hotelCoverpicUrl, location, bookingengineLink } = hotel;
        const matchingSavedHotel = save.find(profile =>
          profile.saveall_id.Hotels.some(savedHotel => savedHotel.hotelid === hotel.hotel_id)
        );
        const saved = matchingSavedHotel ? 'saved' : 'not saved';

        return { hotel_id, hotelName, hotelAddress, hotelRating, hotelLogoUrl, hotelCoverpicUrl, location, bookingengineLink, saved };
      });

      // Prepare data for communities
      const communities = randomCommunities.map(community => {
        const { creatorID, creator_name, group_name, Profile_pic, verificationStatus, description, group_id, location, latitude, longitude, community_type, Admin, Members } = community;
        const isAdmin = Admin.some(admin => admin.user_id === user_id);
        const isMember = Members.some(member => member.user_id === user_id);

        if (isAdmin || isMember) {
          // User is an admin or member, exclude this community
          return null;
        }

        return { creatorID, creator_name, group_name, Profile_pic, verificationStatus, description, group_id, location, latitude, longitude, community_type, Admin, Members };
      }).filter(community => community !== null);

      // Prepare data for services
      const services = randomServices.map(service => {
        const { user_id, serviceId, vendorServicePrice, Profile_pic, User_name, vendorName, vendorImage, location, service_name, verificationStatus, vendorServiceId, display_status } = service;
        return { user_id, serviceId, vendorServicePrice, Profile_pic, User_name, vendorName, vendorImage, location, service_name, verificationStatus, vendorServiceId, display_status };
      });

      res.json([{ posts: [], blogs, hotels, communities, services }]);
      requestCount++;

      // Release the lock for the user
      delete userLocks[user_id];
      return;
    }

    const pagedPosts = posts.slice(skip, skip + pageSize).map(post => post.post_id);
    const PagedPosts = posts.slice(skip, skip + pageSize).map(post => post.adminPostId);
    let blogs = [];
    let hotels = [];
    let communities = [];
    let services = [];
    let adminPosts = [];

    // Fetch data based on requestCount modulo
    if (requestCount % 4 === 0) {
      const randomBlogs = await Blog.aggregate([{ $sample: { size: 5 } }]);
      blogs = randomBlogs.map(blog => {
        const { blog_id, blog_title, blog_content, blog_image, category_name, _id, Profile_pic, User_name, category_id, User_id, likes, comments } = blog;
        const like = likes.some(like => like.user_id === user_id) ? 'liked' : 'not liked';
        const matchingSavedBlog = save.find(profile =>
          profile.saveall_id.Blogs.some(savedBlog => savedBlog.blogid === blog.blog_id)
        );
        const saved = matchingSavedBlog ? 'saved' : 'not saved';

        return { blog_id, blog_title, blog_content, blog_image, category_name, _id, Profile_pic, User_name, category_id, User_id, likes, comments, like, saved };
      });
    } else if (requestCount % 4 === 1) {
      const randomHotels = await Hotel.aggregate([{ $sample: { size: 5 } }]);
      hotels = randomHotels.map(hotel => {
        const { hotel_id, hotelName, hotelAddress, hotelRating, hotelLogoUrl, hotelCoverpicUrl, location, bookingengineLink } = hotel;
        const matchingSavedHotel = save.find(profile =>
          profile.saveall_id.Hotels.some(savedHotel => savedHotel.hotelid === hotel.hotel_id)
        );
        const saved = matchingSavedHotel ? 'saved' : 'not saved';

        return { hotel_id, hotelName, hotelAddress, hotelRating, hotelLogoUrl, hotelCoverpicUrl, location, bookingengineLink, saved };
      });
    } else if (requestCount % 4 === 2) {
      const randomCommunities = await Community.aggregate([{ $match: { community_type: 'Open Community' } }, { $sample: { size: 5 } }]);
      communities = randomCommunities.map(community => {
        const { creatorID, creator_name, group_name, Profile_pic, verificationStatus, description, group_id, location, latitude, longitude, community_type, Admin, Members } = community;
        const isAdmin = Admin.some(admin => admin.user_id === user_id);
        const isMember = Members.some(member => member.user_id === user_id);

        if (isAdmin || isMember) {
          // User is an admin or member, exclude this community
          return null;
        }

        return { creatorID, creator_name, group_name, Profile_pic, verificationStatus, description, group_id, location, latitude, longitude, community_type, Admin, Members };
      }).filter(community => community !== null);
    } else {
      const randomServices = await Service.aggregate([{ $sample: { size: 5 } }]);
      services = randomServices.map(service => {
        const { user_id, serviceId, vendorServicePrice, Profile_pic, User_name, vendorName, vendorImage, location, service_name, verificationStatus, vendorServiceId, display_status } = service;
        return { user_id, serviceId, vendorServicePrice, Profile_pic, User_name, vendorName, vendorImage, location, service_name, verificationStatus, vendorServiceId, display_status };
      });
    }

    const MatchedPosts = await Admin.find({ adminpostId: { $in: PagedPosts }, adminStatus: 'true' }).sort({ _id: -1 });
    const matchedPosts = await Posts.find({ post_id: { $in: pagedPosts } }).sort({ _id: -1 });

    const profiledata = await saved.findOne({ user_id: user_id });

    const postsWithLikesAndComments = await Promise.all(
      matchedPosts.map(async post => {
        const profile = await Profile.findOne({ User_id: post.user_id });

        const Full_name = profile ? profile.Full_name : '';
        const Role = profile ? profile.Role : '';
        const savedPost = profiledata.saveall_id.Posts.find(data => data.postid === post.post_id);
        const isSaved = savedPost ? 'saved' : 'not saved';

        let like = 'not liked';

        const postLikes = await Likes.findOne({ post_id: post.post_id });
        if (postLikes) {
          const userLike = postLikes.likes.find(likeObj => likeObj.user_id === user_id);
          if (userLike) {
            like = 'liked';
          }
        }

        const modifiedPost = post.toObject();
        const pollQuestions = modifiedPost.pollQuestion;

        for (const question of pollQuestions) {
          const options = question.Options;

          for (const option of options) {
            if (option.votes.some(vote => vote.user_id === user_id)) {
              modifiedPost.voted = 'yes';
              break;
            } else {
              modifiedPost.voted = 'no';
            }
          }
        }

        const matchescomment = await Comments.find({ post_id: post.post_id });
        const Comment_count = matchescomment ? matchescomment.reduce((count, { comments }) => {
          const visibleComments = comments.filter(comment => comment.display_status === '1');
          return count + visibleComments.length;
        }, 0) : 0;

        const postLike = await Likes.findOne({ post_id: post.post_id });
        const filteredLikes = postLike ? postLike.likes.filter(likeObj => likeObj.display_status === '1') : [];
        const Like_count = filteredLikes.length;

        return {
          ...modifiedPost,
          Full_name,
          Role,
          like,
          Like_count,
          Comment_count,
          isSaved,
        };
      })
    );

    
    // Merge MatchedPosts into posts array
    const mergedPosts = [...MatchedPosts, ...postsWithLikesAndComments];

    res.json([{ posts: mergedPosts, blogs, hotels, communities, services }]);

    // Move displayed posts to the end of the feed array
    const movedPosts = posts.slice(skip, skip + pageSize);
    const remainingPosts = posts.slice(skip + pageSize);

    file.posts = [...remainingPosts, ...movedPosts];
    await file.save();

    requestCount++;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    // Release the lock for the user
    delete userLocks[user_id];
  }
};

// const File = require('../../models/feedcache');
// const Posts = require('../../models/Post');
// const Likes = require('../../models/feedlikes');
// const Comments = require('../../models/comments');
// const Profile = require('../../models/Profile');
// const saved = require('../../models/saved');
// const Blog = require('../../models/blogs');
// const Hotel = require('../../models/Hotels');
// const Community = require('../../models/userGroup');
// const Service = require('../../models/service');
// const Admin = require('../../models/adminPost');
// const moment = require('moment-timezone');
// const userLocks = {}; // Object to store user locks

// let requestCount = 0;

// module.exports = async (req, res) => {
//   const { user_id } = req.params;
//   const pageSize = 10;
//   const skip = 0; // Fetch the first 10 posts always
//   const save = await saved.find({ user_id });

//   // Check if the user already has a lock
//   if (userLocks[user_id]) {
//     return res.status(429).json({ message: 'Too many requests' });
//   }

//   // Create a lock for the user
//   userLocks[user_id] = true;

//   try {
//     let file = await File.findOne({ user_id });

//     if (!file) {
//       return res.status(404).json({ message: 'File not found' });
//     }

//     // Remove objects with adminPostId and whenWhatched time more than 1 minute from current time
//     file.posts = file.posts.filter(post => {
//       const currentTime = moment().tz("Asia/Calcutta");
//       const postTime = moment(post.whenWhatched, "HH:mm:ss");
//       const timeDifference = moment.duration(currentTime.diff(postTime));
//       const minutesDifference = timeDifference.asMinutes();

//       return !(post.adminPostId && minutesDifference > 1440);
//     });

//     const { posts } = file;
//     const totalPosts = posts.length;

//     if (totalPosts === 0) {
//       // Fetch random data (blogs, hotels, communities, services) when there are no posts
//       const [randomBlogs, randomHotels, randomCommunities, randomServices] = await Promise.all([
//         Blog.aggregate([{ $sample: { size: 5 } }]),
//         Hotel.aggregate([{ $sample: { size: 5 } }]),
//         Community.aggregate([{ $match: { community_type: 'Open Community' } }, { $sample: { size: 5 } }]),
//         Service.aggregate([{ $sample: { size: 5 } }])
//       ]);

//       // Prepare data for blogs
//       const blogs = randomBlogs.map(blog => {
//         const { blog_id, blog_title, blog_content, blog_image, category_name, _id, Profile_pic, User_name, category_id, User_id, likes, comments } = blog;
//         const like = likes.some(like => like.user_id === user_id) ? 'liked' : 'not liked';
//         const matchingSavedBlog = save.find(profile =>
//           profile.saveall_id.Blogs.some(savedBlog => savedBlog.blogid === blog.blog_id)
//         );
//         const saved = matchingSavedBlog ? 'saved' : 'not saved';

//         return { blog_id, blog_title, blog_content, blog_image, category_name, _id, Profile_pic, User_name, category_id, User_id, likes, comments, like, saved };
//       });

//       // Prepare data for hotels
//       const hotels = randomHotels.map(hotel => {
//         const { hotel_id, hotelName, hotelAddress, hotelRating, hotelLogoUrl, hotelCoverpicUrl, location, bookingengineLink } = hotel;
//         const matchingSavedHotel = save.find(profile =>
//           profile.saveall_id.Hotels.some(savedHotel => savedHotel.hotelid === hotel.hotel_id)
//         );
//         const saved = matchingSavedHotel ? 'saved' : 'not saved';

//         return { hotel_id, hotelName, hotelAddress, hotelRating, hotelLogoUrl, hotelCoverpicUrl, location, bookingengineLink, saved };
//       });

//       // Prepare data for communities
//       const communities = randomCommunities.map(community => {
//         const { creatorID, creator_name, group_name, Profile_pic, verificationStatus, description, group_id, location, latitude, longitude, community_type, Admin, Members } = community;
//         const isAdmin = Admin.some(admin => admin.user_id === user_id);
//         const isMember = Members.some(member => member.user_id === user_id);

//         if (isAdmin || isMember) {
//           // User is an admin or member, exclude this community
//           return null;
//         }

//         return { creatorID, creator_name, group_name, Profile_pic, verificationStatus, description, group_id, location, latitude, longitude, community_type, Admin, Members };
//       }).filter(community => community !== null);

//       // Prepare data for services
//       const services = randomServices.map(service => {
//         const { user_id, serviceId, vendorServicePrice, Profile_pic, User_name, vendorName, vendorImage, location, service_name, verificationStatus, vendorServiceId, display_status } = service;
//         return { user_id, serviceId, vendorServicePrice, Profile_pic, User_name, vendorName, vendorImage, location, service_name, verificationStatus, vendorServiceId, display_status };
//       });

//       res.json([{ posts: [], blogs, hotels, communities, services }]);
//       requestCount++;

//       // Release the lock for the user
//       delete userLocks[user_id];
//       return;
//     }

//     const pagedPosts = posts.slice(skip, skip + pageSize).map(post => post.post_id);
//     const PagedPosts = posts.slice(skip, skip + pageSize).map(post => post.adminPostId);
//     let blogs = [];
//     let hotels = [];
//     let communities = [];
//     let services = [];
//     let adminPosts = [];

//     // Fetch data based on requestCount modulo
//     if (requestCount % 4 === 0) {
//       const randomBlogs = await Blog.aggregate([{ $sample: { size: 5 } }]);
//       blogs = randomBlogs.map(blog => {
//         const { blog_id, blog_title, blog_content, blog_image, category_name, _id, Profile_pic, User_name, category_id, User_id, likes, comments } = blog;
//         const like = likes.some(like => like.user_id === user_id) ? 'liked' : 'not liked';
//         const matchingSavedBlog = save.find(profile =>
//           profile.saveall_id.Blogs.some(savedBlog => savedBlog.blogid === blog.blog_id)
//         );
//         const saved = matchingSavedBlog ? 'saved' : 'not saved';
          
//         return { blog_id, blog_title, blog_content, blog_image, category_name, _id, Profile_pic, User_name, category_id, User_id, likes, comments, like, saved };
//       });
//     } else if (requestCount % 4 === 1) {
//       const randomHotels = await Hotel.aggregate([{ $sample: { size: 5 } }]);
//       hotels = randomHotels.map(hotel => {
//         const { hotel_id, hotelName, hotelAddress, hotelRating, hotelLogoUrl, hotelCoverpicUrl, location, bookingengineLink } = hotel;
//         const matchingSavedHotel = save.find(profile =>
//           profile.saveall_id.Hotels.some(savedHotel => savedHotel.hotelid === hotel.hotel_id)
//         );
//         const saved = matchingSavedHotel ? 'saved' : 'not saved';

//         return { hotel_id, hotelName, hotelAddress, hotelRating, hotelLogoUrl, hotelCoverpicUrl, location, bookingengineLink, saved };
//       });
//     } else if (requestCount % 4 === 2) {
//       const randomCommunities = await Community.aggregate([{ $match: { community_type: 'Open Community' } }, { $sample: { size: 5 } }]);
//       communities = randomCommunities.map(community => {
//         const { creatorID, creator_name, group_name, Profile_pic, verificationStatus, description, group_id, location, latitude, longitude, community_type, Admin, Members } = community;
//         const isAdmin = Admin.some(admin => admin.user_id === user_id);
//         const isMember = Members.some(member => member.user_id === user_id);

//         if (isAdmin || isMember) {
//           // User is an admin or member, exclude this community
//           return null;
//         }

//         return { creatorID, creator_name, group_name, Profile_pic, verificationStatus, description, group_id, location, latitude, longitude, community_type, Admin, Members };
//       }).filter(community => community !== null);
//     } else {
//       const randomServices = await Service.aggregate([{ $sample: { size: 5 } }]);
//       services = randomServices.map(service => {
//         const { user_id, serviceId, vendorServicePrice, Profile_pic, User_name, vendorName, vendorImage, location, service_name, verificationStatus, vendorServiceId, display_status } = service;
//         return { user_id, serviceId, vendorServicePrice, Profile_pic, User_name, vendorName, vendorImage, location, service_name, verificationStatus, vendorServiceId, display_status };
//       });
//     }

//     const MatchedPosts = await Admin.find({ adminpostId: { $in: PagedPosts },adminStatus: 'true' }).sort({ _id: -1 });
//     const matchedPosts = await Posts.find({ post_id: { $in: pagedPosts } }).sort({ _id: -1 });

//     const profiledata = await saved.findOne({ user_id: user_id });

//     const postsWithLikesAndComments = await Promise.all(
//       matchedPosts.map(async post => {
//         const profile = await Profile.findOne({ User_id: post.user_id });

//         const Full_name = profile ? profile.Full_name : '';
//         const Role = profile ? profile.Role : '';
//         const savedPost = profiledata.saveall_id.Posts.find(data => data.postid === post.post_id);
//         const isSaved = savedPost ? 'saved' : 'not saved';

//         let like = 'not liked';

//         const postLikes = await Likes.findOne({ post_id: post.post_id });
//         if (postLikes) {
//           const userLike = postLikes.likes.find(likeObj => likeObj.user_id === user_id);
//           if (userLike) {
//             like = 'liked';
//           }
//         }

//         const modifiedPost = post.toObject();
//         const pollQuestions = modifiedPost.pollQuestion;

//         for (const question of pollQuestions) {
//           const options = question.Options;

//           for (const option of options) {
//             if (option.votes.some(vote => vote.user_id === user_id)) {
//               modifiedPost.voted = 'yes';
//               break;
//             } else {
//               modifiedPost.voted = 'no';
//             }
//           }
//         }

//         const matchescomment = await Comments.find({ post_id: post.post_id });
//         const Comment_count = matchescomment ? matchescomment.reduce((count, { comments }) => {
//           const visibleComments = comments.filter(comment => comment.display_status === '1');
//           return count + visibleComments.length;
//         }, 0) : 0;

//         const postLike = await Likes.findOne({ post_id: post.post_id });
//         const filteredLikes = postLike ? postLike.likes.filter(likeObj => likeObj.display_status === '1') : [];
//         const Like_count = filteredLikes.length;

//         return {
//           ...modifiedPost,
//           Full_name,
//           Role,
//           like,
//           Like_count,
//           Comment_count,
//           isSaved,
//         };
//       })
//     );

//     // Set isFetched to "true" and whenWhatched to current time for all records
//     const currentTime = moment().tz("Asia/Calcutta").format("HH:mm:ss");

//     file.posts.forEach((post) => {
//       if (!post.whenWhatched) {
//         post.isFetched = "true";
//         post.whenWhatched = currentTime;
//       }
//     });

//     // Save the updated file
//     await file.save();

//     // Merge MatchedPosts into posts array
//     const mergedPosts = [...MatchedPosts, ...postsWithLikesAndComments];
    
//     res.json([{ posts: mergedPosts, blogs, hotels, communities, services }]);

//     // Move displayed posts to the end of the feed array
//     const movedPosts = posts.slice(skip, skip + pageSize);
//     const remainingPosts = posts.slice(skip + pageSize);

//     file.posts = [...remainingPosts, ...movedPosts];
//     await file.save();

//     requestCount++;
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   } finally {
//     // Release the lock for the user
//     delete userLocks[user_id];
//   }
// };