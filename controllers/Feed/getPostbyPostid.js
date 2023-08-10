

const post = require('../../models/Post');
const like = require('../../models/feedlikes');
const Comment = require('../../models/comments');
const profile = require('../../models/saved');


module.exports = async (req, res) => {
  try {
    const { User_id, post_id } = req.params;

    const Post = await post.find({ post_id });
    const feedlike = await like.find({ post_id });
    const feedcomment = await Comment.find({ post_id });
    const profiles = await profile.find({ user_id: User_id });



    const result = Post.map(posts => {
      //const matchingProfile = profiles.find(profile => profile.User_id === posts.user_id);
      const matchingSavedBlog = profiles.find(profile =>
        profile.saveall_id.Posts.some(savedBlog => savedBlog.postid === posts.post_id)
      );

      //like
      const liked = feedlike.some((likedPost) => likedPost.likes.some((like) => like.user_id === User_id))
        ? 'liked'
        : 'not liked';


      let saved = 'not saved';

      if (matchingSavedBlog) {
        saved = 'saved';
      }

      // count likes for the specific post
      const postLikes = feedlike.find((likedPost) => likedPost.post_id === posts.post_id);
      const likeCount = postLikes ? postLikes.likes.length : 0;

      // count comment for the specific post
      const postcomment = feedcomment.find((commentPost) => commentPost.post_id === posts.post_id);
      const commentCount = postcomment ? postcomment.comments.length : 0;

      return {
        ...posts.toObject(),
        saved: saved,
        liked: liked,
        likeCount: likeCount,
        commentCount:commentCount
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};


