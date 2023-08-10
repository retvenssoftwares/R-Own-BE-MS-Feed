
const blog = require('../../models/blogs');
const profile = require('../../models/Profile');
const saved = require('../../models/saved');
const category = require('../../models/blogCategories');

module.exports = async (req, res) => {
  try {
    const pageSize = 10;

    const page = parseInt(req.query.page) || 1; // Use req.query.page to get the current page number

    const skip = (page - 1) * pageSize;

    const { User_id } = req.params;

    const Blog = await blog.find().sort({date_added:-1}).skip(skip).limit(pageSize);
  
    const profiles = await profile.find({ User_id });

    const save = await saved.find({ user_id:User_id });

    const categorys = await category.find({});

    const result = Blog.map(blog => {
      const {date_added} = blog;
      
      const matchingProfile = profiles.find(profile => profile.User_id === blog.User_id);
      const matchingcategory = categorys.find(data => data.category_id === blog.category_id);
      const matchingSavedBlog = save.find(profile =>
        profile.saveall_id.Blogs.some(savedBlog => savedBlog.blogid === blog.blog_id)
      );

      const resultlike = blog.likes.some(liked => liked.user_id === User_id);

      const Like_count = blog.likes.length
      const comment_count = blog.comments.length

      let like = "not liked";
      if (resultlike) {
        like = "liked";
      }


      let saved = 'not saved';


      if (matchingSavedBlog) {
        saved = 'saved';
      }
      return {
     
        //category_name: matchingcategory ? matchingcategory.category_name : null,
        blog_title:blog.blog_title,
        blog_image: blog.blog_image,
        category_name:blog.category_name,
        User_name:blog.User_name,
        Full_name:blog.Full_name,
        Profile_pic:blog.Profile_pic,
        verificationStatus: blog.verificationStatus,
        // User_name: matchingProfile ? matchingProfile.User_name : null,
        // Full_name: matchingProfile ? matchingProfile.Full_name : null,
        // Profile_pic: matchingProfile ? matchingProfile.Profile_pic : null,
        saved: saved,
        display_status: blog.display_status,
        blog_id:blog.blog_id,
        like: like,
        Like_count: Like_count,
        comment_count,
        date_added:date_added
      };
    });
    if (result.length > 0) {
      res.json([{
        page,
            pageSize,
            // totalPages,
            // totalPosts,
        blogs: result
      }]);
    } else {
      res.json([{ message: 'You have reached the end' }]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
