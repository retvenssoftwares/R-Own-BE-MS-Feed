

// // const File = require('../../models/feedcache');
// // const Posts = require('../../models/Post');
// // const Likes = require('../../models/feedlikes');
// // const Comments = require('../../models/comments');
// // const Profile = require('../../models/Profile');
// // const saved = require('../../models/saved');
// // let currentPage = 1;

// // module.exports = async (req, res) => {
// //   const { user_id } = req.params;
// //   const pageSize = 10;
// //   const skip = (currentPage - 1) * pageSize;

// //   try {
// //     let file = await File.findOne({ user_id });

// //     if (!file) {
// //       return res.status(404).json({ message: 'File not found' });
// //     }

// //     const { posts } = file;

// //     const totalPosts = posts.length;

// //     if (totalPosts === 0) {
// //       return res.json([{ message: 'No posts yet' }]);
// //     }

// //     const pagedPosts = posts.slice(skip, skip + pageSize).map(post => post.post_id);

// //     if (pagedPosts.length === 0) {
// //       const remainingPosts = posts.slice(0, pageSize).map(post => post.post_id);

// //       const matchedPosts = await Posts.find({ post_id: { $in: remainingPosts } }).sort({ _id: -1 });;
// //       const profiledata = await saved.findOne({ user_id: user_id });

// //       const postsWithLikesAndComments = await Promise.all(
// //         matchedPosts.map(async post => {
// //           const profile = await Profile.findOne({ User_id: post.user_id });

// //           const Full_name = profile ? profile.Full_name : '';
// //           const Role = profile ? profile.Role : '';
// //           // const bookingengineLink = profile ? profile.hotelOwnerInfo.bookingEngineLink : '';

// //           const savedPost = profiledata.saveall_id.Posts.find(data => data.postid === post.post_id);
// //           const isSaved = savedPost ? 'saved' : 'not saved';

// //           let like = 'Unliked';

// //           const postLikes = await Likes.findOne({ post_id: post.post_id });
// //           if (postLikes) {
// //             const userLike = postLikes.likes.find(likeObj => likeObj.user_id === user_id);
// //             if (userLike) {
// //               like = 'Liked';
// //             }
// //           }

// //           const modifiedPost = post.toObject();
// //           const pollQuestions = modifiedPost.pollQuestion;

// //           for (const question of pollQuestions) {
// //             const options = question.Options;

// //             for (const option of options) {
// //               if (option.votes.some(vote => vote.user_id === user_id)) {
// //                 modifiedPost.voted = 'yes';
// //                 break;
// //               } else {
// //                 modifiedPost.voted = 'no';
// //               }
// //             }
// //           }

// //           const matchescomment = await Comments.find({ post_id: post.post_id });
// //           const Comment_count = matchescomment ? matchescomment.reduce((count, { comments }) => {
// //             const visibleComments = comments.filter(comment => comment.display_status === '1');
// //             return count + visibleComments.length;
// //           }, 0) : 0;

// //           const postLike = await Likes.findOne({ post_id: post.post_id });
// //           const filteredLikes = postLike ? postLike.likes.filter(likeObj => likeObj.display_status === '1') : [];
// //           const Like_count = filteredLikes.length;

// //           return {
// //             ...modifiedPost,
// //             Full_name,
// //             Role,
// //             like,
// //             // bookingengineLink,
// //             Like_count,
// //             Comment_count,
// //             isSaved
// //           };
// //         })
// //       );

// //       res.json([{ posts: postsWithLikesAndComments }]);

// //       // Move old posts to the end of the feed array
// //       const movedPosts = posts.slice(0, pageSize);
// //       file.posts = [...posts.slice(pageSize), ...movedPosts];
// //       await file.save();

// //       currentPage++;
// //     } else {
// //       const matchedPosts = await Posts.find({ post_id: { $in: pagedPosts } }).sort({ _id: -1 });
// //       const profiledata = await saved.findOne({ user_id: user_id });

// //       const postsWithLikesAndComments = await Promise.all(
// //         matchedPosts.map(async post => {
// //           const profile = await Profile.findOne({ User_id: post.user_id });

// //           const Full_name = profile ? profile.Full_name : '';
// //           const Role = profile ? profile.Role : '';
// //           // const bookingengineLink = profile ? profile.hotelOwnerInfo.bookingEngineLink : '';

// //           const savedPost = profiledata.saveall_id.Posts.find(data => data.postid === post.post_id);
// //           const isSaved = savedPost ? 'saved' : 'not saved';

// //           let like = 'Unliked';

// //           const postLikes = await Likes.findOne({ post_id: post.post_id });
// //           if (postLikes) {
// //             const userLike = postLikes.likes.find(likeObj => likeObj.user_id === user_id);
// //             if (userLike) {
// //               like = 'Liked';
// //             }
// //           }

// //           const modifiedPost = post.toObject();
// //           const pollQuestions = modifiedPost.pollQuestion;

// //           for (const question of pollQuestions) {
// //             const options = question.Options;

// //             for (const option of options) {
// //               if (option.votes.some(vote => vote.user_id === user_id)) {
// //                 modifiedPost.voted = 'yes';
// //                 break;
// //               } else {
// //                 modifiedPost.voted = 'no';
// //               }
// //             }
// //           }

// //           const matchescomment = await Comments.find({ post_id: post.post_id });
// //           const Comment_count = matchescomment ? matchescomment.reduce((count, { comments }) => {
// //             const visibleComments = comments.filter(comment => comment.display_status === '1');
// //             return count + visibleComments.length;
// //           }, 0) : 0;

// //           const postLike = await Likes.findOne({ post_id: post.post_id });
// //           const filteredLikes = postLike ? postLike.likes.filter(likeObj => likeObj.display_status === '1') : [];
// //           const Like_count = filteredLikes.length;

// //           return {
// //             ...modifiedPost,
// //             Full_name,
// //             Role,
// //             like,
// //             // bookingengineLink,
// //             Like_count,
// //             Comment_count,
// //             isSaved
// //           };
// //         })
// //       );

// //       res.json([{ posts: postsWithLikesAndComments }]);

// //       // Move displayed posts to the end of the feed array
// //       const movedPosts = posts.slice(0, skip);
// //       file.posts = [...posts.slice(skip), ...movedPosts];
// //       await file.save();

// //       // currentPage++;
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

// //ignoring old post

// const File = require('../../models/feedcache');
// const Posts = require('../../models/Post');
// const Likes = require('../../models/feedlikes');
// const Comments = require('../../models/comments');
// const Profile = require('../../models/Profile');
// const saved = require('../../models/saved');
// let currentPage = 1;

// module.exports = async (req, res) => {
//   const { user_id } = req.params;
//   const pageSize = 10;
//   const skip = (currentPage - 1) * pageSize;

//   try {
//     let file = await File.findOne({ user_id });

//     if (!file) {
//       return res.status(404).json({ message: 'File not found' });
//     }

//     const { posts } = file;

//     const totalPosts = posts.length;

//     if (totalPosts === 0) {
//       return res.json([{ message: 'No posts yet' }]);
//     }

//     const pagedPosts = posts.slice(0, pageSize).map(post => post.post_id);

//     if (pagedPosts.length === 0) {
//       const remainingPosts = posts.slice(0, pageSize).map(post => post.post_id);

//       const matchedPosts = await Posts.find({ post_id: { $in: remainingPosts } }).sort({ _id: -1 });;
//       const profiledata = await saved.findOne({ user_id: user_id });

//       const postsWithLikesAndComments = await Promise.all(
//         matchedPosts.map(async post => {
//           const profile = await Profile.findOne({ User_id: post.user_id });

//           const Full_name = profile ? profile.Full_name : '';
//           const Role = profile ? profile.Role : '';
//           // const bookingengineLink = profile ? profile.hotelOwnerInfo.bookingEngineLink : '';

//           const savedPost = profiledata.saveall_id.Posts.find(data => data.postid === post.post_id);
//           const isSaved = savedPost ? 'saved' : 'not saved';

//           let like = 'Unliked';

//           const postLikes = await Likes.findOne({ post_id: post.post_id });
//           if (postLikes) {
//             const userLike = postLikes.likes.find(likeObj => likeObj.user_id === user_id);
//             if (userLike) {
//               like = 'Liked';
//             }
//           }

//           const modifiedPost = post.toObject();
//           const pollQuestions = modifiedPost.pollQuestion;

//           for (const question of pollQuestions) {
//             const options = question.Options;

//             for (const option of options) {
//               if (option.votes.some(vote => vote.user_id === user_id)) {
//                 modifiedPost.voted = 'yes';
//                 break;
//               } else {
//                 modifiedPost.voted = 'no';
//               }
//             }
//           }

//           const matchescomment = await Comments.find({ post_id: post.post_id });
//           const Comment_count = matchescomment ? matchescomment.reduce((count, { comments }) => {
//             const visibleComments = comments.filter(comment => comment.display_status === '1');
//             return count + visibleComments.length;
//           }, 0) : 0;

//           const postLike = await Likes.findOne({ post_id: post.post_id });
//           const filteredLikes = postLike ? postLike.likes.filter(likeObj => likeObj.display_status === '1') : [];
//           const Like_count = filteredLikes.length;

//           return {
//             ...modifiedPost,
//             Full_name,
//             Role,
//             like,
//             // bookingengineLink,
//             Like_count,
//             Comment_count,
//             isSaved
//           };
//         })
//       );

//       res.json([{ posts: postsWithLikesAndComments }]);

//       // Move old posts to the end of the feed array
//       const movedPosts = posts.slice(0, pageSize);
//       file.posts = [...posts.slice(pageSize), ...movedPosts];
//       await file.save();
//     } else {
//       const matchedPosts = await Posts.find({ post_id: { $in: pagedPosts } }).sort({ _id: -1 });
//       const profiledata = await saved.findOne({ user_id: user_id });

//       const postsWithLikesAndComments = await Promise.all(
//         matchedPosts.map(async post => {
//           const profile = await Profile.findOne({ User_id: post.user_id });

//           const Full_name = profile ? profile.Full_name : '';
//           const Role = profile ? profile.Role : '';
//           // const bookingengineLink = profile ? profile.hotelOwnerInfo.bookingEngineLink : '';

//           const savedPost = profiledata.saveall_id.Posts.find(data => data.postid === post.post_id);
//           const isSaved = savedPost ? 'saved' : 'not saved';

//           let like = 'Unliked';

//           const postLikes = await Likes.findOne({ post_id: post.post_id });
//           if (postLikes) {
//             const userLike = postLikes.likes.find(likeObj => likeObj.user_id === user_id);
//             if (userLike) {
//               like = 'Liked';
//             }
//           }

//           const modifiedPost = post.toObject();
//           const pollQuestions = modifiedPost.pollQuestion;

//           for (const question of pollQuestions) {
//             const options = question.Options;

//             for (const option of options) {
//               if (option.votes.some(vote => vote.user_id === user_id)) {
//                 modifiedPost.voted = 'yes';
//                 break;
//               } else {
//                 modifiedPost.voted = 'no';
//               }
//             }
//           }

//           const matchescomment = await Comments.find({ post_id: post.post_id });
//           const Comment_count = matchescomment ? matchescomment.reduce((count, { comments }) => {
//             const visibleComments = comments.filter(comment => comment.display_status === '1');
//             return count + visibleComments.length;
//           }, 0) : 0;

//           const postLike = await Likes.findOne({ post_id: post.post_id });
//           const filteredLikes = postLike ? postLike.likes.filter(likeObj => likeObj.display_status === '1') : [];
//           const Like_count = filteredLikes.length;

//           return {
//             ...modifiedPost,
//             Full_name,
//             Role,
//             like,
//             // bookingengineLink,
//             Like_count,
//             Comment_count,
//             isSaved
//           };
//         })
//       );

//       res.json([{ posts: postsWithLikesAndComments }]);

//       // Move displayed posts to the end of the feed array
//       const movedPosts = posts.slice(0, 10);
//       file.posts = [...posts.slice(10), ...movedPosts];
//       await file.save();
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const File = require('../../models/feedcache');
const Posts = require('../../models/Post');
const Likes = require('../../models/feedlikes');
const Comments = require('../../models/comments');
const Profile = require('../../models/Profile');
const saved = require('../../models/saved');

const userLocks = {}; // Object to store user locks

let requestCount = 0;

module.exports = async (req, res) => {
  const { user_id } = req.params;
  const pageSize = 10;
  const skip = 0; // Fetch the first 10 posts always
  const save = await saved.find({ user_id: user_id });

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

    const { posts } = file;
    const totalPosts = posts.length;

    if (totalPosts === 0) {
      res.json([{ posts: [] }]);
      requestCount++;

      // Release the lock for the user
      delete userLocks[user_id];
      return;
    }

    const pagedPosts = posts.slice(skip, skip + pageSize).map(post => post.post_id);

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
          isSaved
        };
      })
    );

    res.json([{ posts: postsWithLikesAndComments }]);

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
