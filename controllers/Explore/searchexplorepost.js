

const Post = require('../../models/Post');
const Profile = require('../../models/saved');
const Like = require('../../models/feedlikes');
const Comment = require('../../models/comments');

module.exports = async (req, res) => {
  try {
    const caption = req.params.caption; // Assuming the caption is provided in the request body
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter or default to 1
    const pageSize = 10; // Number of entries per page
    const skip = (page - 1) * pageSize;
    const user_id = req.params.user_id; // Assuming the user_id is provided in the request body

    const searchQuery = {
      caption: { $regex: new RegExp(caption, 'i') },
      post_type: { $in: ['share some media', 'click and share']},
      Can_See: { $in: ['Anyone'] }
    };

    const totalPosts = await Post.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalPosts / pageSize);

    // Check if the specified page is within the valid range
    if (page > totalPages) {
      return res.json([{ message: 'you have reached the end' }]);
    }

    const pagedPosts = await Post
      .find(searchQuery)
      .skip(skip)
      .limit(pageSize)
      .sort({date_added:-1});

    const likedPosts = await Like.find({ 'likes.user_id': user_id });

    const userProfile = await Profile.findOne({ user_id: user_id });

    const postIds = pagedPosts.map((post) => post.post_id);

    //comment count
    const commentCounts = await Comment.aggregate([
      { $match: { post_id: { $in: postIds } } },
      {
        $addFields: {
          comments: {
            $filter: {
              input: "$comments",
              as: "comment",
              cond: { $eq: ["$$comment.display_status", "1"] }
            }
          }
        }
      },
      { $group: { _id: '$post_id', commentCount: { $sum: { $size: '$comments' } } } }
    ]);
    const commentCountMap = new Map(commentCounts.map((item) => [item._id, item.commentCount]));

    //like count
    const likeCounts = await Like.aggregate([
      { $match: { post_id: { $in: postIds } } },
      {
        $addFields: {
          filteredLikes: {
            $filter: {
              input: "$likes",
              as: "like",
              cond: { $eq: ["$$like.display_status", "1"] }
            }
          }
        }
      },
      { $group: { _id: '$post_id', likeCount: { $sum: { $size: '$filteredLikes' } } } }
    ]);
    const likeCountMap = new Map(likeCounts.map((item) => [item._id, item.likeCount]));

///////
    const postsWithCounts = pagedPosts.map((post) => {
      const liked = likedPosts.some((likedPost) => likedPost.post_id === post.post_id && likedPost.likes.some((like) => like.user_id === user_id))
        ? 'liked'
        : 'not liked';

      const saved = userProfile.saveall_id.Posts.some((savedPost) => savedPost.postid === post.post_id)
        ? 'saved'
        : 'not saved';

      // const likeCount = post.likes && post.likes.length ? post.likes.length : 0;
      
      const likeCount = likeCountMap.get(post.post_id) || 0;
      
      //comment
      const commentCount = commentCountMap.get(post.post_id) || 0;

      return { ...post.toObject(), liked, saved, likeCount, commentCount };
    });

    res.json([{ 
      page,
      pageSize,
      posts: postsWithCounts }]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
