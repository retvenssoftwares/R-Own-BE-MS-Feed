const Post = require("../../models/Post");
const moment = require('moment-timezone');

module.exports = async (req, res) => {
  try {
    const pipeline = [
      // Filter the documents where date_added is not null
      {
        $match: {
          date_added: { $exists: true }
        }
      },
      // Group the documents by date_added and count the occurrences of each date
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$date_added" } }
          },
          count: { $sum: 1 }
        }
      },
      // Sort the results by date in ascending order (optional)
      {
        $sort: { _id: 1 }
      }
    ];

    const postCounts = await Post.aggregate(pipeline);

    res.json({
      postCounts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
