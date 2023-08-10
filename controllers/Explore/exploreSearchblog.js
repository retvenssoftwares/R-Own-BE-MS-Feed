


// const blog = require('../../models/blogs');
// const profile = require('../../models/Profile');
// const category = require('../../models/blogCategories');

// module.exports = async (req, res) => {
//   try {
//     const keyword = req.params.keyword;
//     const pageSize = 15;
//     const page = parseInt(req.query.page) || 1;

//     const skip = (page - 1) * pageSize;

//     const { User_id } = req.params;

//     const searchQuery = {
//       $or: [
//         { blog_title: { $regex: new RegExp(keyword, 'i') } },
//       ],
//     };

//     const blogs = await blog.find(searchQuery).skip(skip).limit(pageSize);
//     const profileData = await profile.findOne({ User_id });
//     const categories = await category.find({}, 'category_id category_name');

//     const result = await Promise.all(
//       blogs.map(async (blog) => {
//         const matchingCategory = categories.find((category) => category.category_id.toString() === blog.category_id.toString());

  
//         const resultlike = blog.likes.some(liked => liked.user_id === User_id);
  
//         const Like_count = blog.likes.length
//         const comment_count = blog.comments.length
  
//         let like = "not liked";
//         if (resultlike) {
//           like = "liked";
//         }   
        

//         let saved = 'no';

//         if (profileData) {
//           const savedBlogs = profileData.saveall_id.Blogs;
//           const isSaved = savedBlogs.some((savedBlog) => savedBlog.blogid.toString() === blog.blog_id.toString());
//           saved = isSaved ? 'yes' : 'no';
//         }

//         if (!matchingCategory) {
//           return {
//             ...blog.toObject(),
//             User_name: null,
//             Profile_pic: null,
//             category_name: null,
//             saved: saved,
//             like:like,
//             Like_count,
//             comment_count

//           };
//         } else {
//           return {
//             ...blog.toObject(),
//             User_name: profileData ? profileData.User_name : null,
//             Profile_pic: profileData ? profileData.Profile_pic : null,
//             category_name: matchingCategory.category_name,
//             saved: saved,
//             like:like,
//             Like_count,
//             comment_count
//           };
//         }
//       })
//     );

//     if (result.length > 0) {
//       res.json([{ blogs: result }]);
//     } else {
//       res.json([{ message: 'You have reached the end' }]);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Something went wrong' });
//   }
// };

const blog = require('../../models/blogs');
const profile = require('../../models/Profile');
const saved = require('../../models/saved');
const category = require('../../models/blogCategories');

module.exports = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const pageSize = 15;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * pageSize;
    const { User_id } = req.params;

    const searchQuery = {
      $or: [
        { blog_title: { $regex: new RegExp(keyword, 'i') } },
      ],
    };

    const blogs = await blog.find(searchQuery).sort({date_added:-1}).skip(skip).limit(pageSize);
    const profileData = await profile.findOne({ User_id });
    const save = await saved.findOne({ user_id:User_id });
    const categories = await category.find({}, 'category_id category_name');

    const result = await Promise.all(
      blogs.map(async (blog) => {
        const matchingCategory = categories.find((category) => category.category_id && category.category_id === blog.category_id);

        const resultlike = blog.likes && blog.likes.some(liked => liked.user_id === User_id);
        const Like_count = blog.likes ? blog.likes.length : 0;
        const comment_count = blog.comments ? blog.comments.length : 0;
        let like = "not liked";
        if (resultlike) {
          like = "liked";
        }
        
        let saved = 'not saved';

        if (save) {
          const savedBlogs = save.saveall_id.Blogs;
          const isSaved = savedBlogs.some((savedBlog) => savedBlog.blogid === blog.blog_id);
          saved = isSaved ? 'saved' : 'not saved';
        }

        if (!matchingCategory) {
          return {
            category_name: null,
            blog_title: blog.blog_title,
            blog_image: blog.blog_image,
            User_name: null,
            Profile_pic: null,
            Full_name: null,
            verificationStatus: null,
            saved: saved,
            like: like,
            Like_count,
            comment_count,
            display_status: null
          };
        } else {
          return {
            category_name:blog.category_name,
            blog_title: blog.blog_title,
            blog_image: blog.blog_image,
            User_name:blog.User_name,
            Profile_pic: blog.Profile_pic,
            Full_name: blog.Full_name,
            verificationStatus: blog.verificationStatus,
            blog_id:blog.blog_id,
            saved: saved,
            like: like,
            Like_count,
            comment_count,
            display_status: blog.display_status
          };
        }
      })
    );

    if (result.length > 0) {
      res.json([{
        page,
        pageSize, 
        blogs: result }]);
    } else {
      res.json([{ message: 'You have reached the end' }]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};

