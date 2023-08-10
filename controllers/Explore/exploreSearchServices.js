
const Service = require('../../models/service');

module.exports = async (req, res) => {
  try {
    const keyword = req.params.keyword; // Assuming the keyword is provided in the request body
    const pageSize = 6;
    const page = parseInt(req.query.page) || 1; // Assuming the page number is provided as a query parameter

    const searchQuery = {
      $or: [
        { service_name: { $regex: new RegExp(keyword, 'i') } },
         {vendorName : {$regex : new RegExp(keyword, 'i')}}
      ],
      
    };

    const totalPosts = await Service.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalPosts / pageSize);

    if(page > totalPages){
        return res.json([{ message: "You have reached the end" }]);
    }
    const pagedPosts = await Service
      .find(searchQuery)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({date_added:-1});

    res.json([{
      page,
      pageSize,
      // totalPages,
      // totalPosts,
      posts: pagedPosts
    }]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};

