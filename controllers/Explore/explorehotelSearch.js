

const hotel = require('../../models/Hotels');
const Profile = require('../../models/saved');

module.exports = async (req, res) => {
    try {
        const keyword = req.params.keyword; // Assuming the keyword is provided in the request body
        const pageSize = 15;
        const page = parseInt(req.query.page) || 1; // Assuming the page number is provided as a query parameter

        const searchQuery = {
            $or: [
                { hotelAddress: { $regex: new RegExp(keyword, 'i') } },
                { hotelName: { $regex: new RegExp(keyword, 'i') } },
            ],
        };

        const hotels = await hotel.find(searchQuery).sort({date_added:-1});
        const profileData = await Profile.findOne({ user_id: req.params.User_id });

        const result = await Promise.all(
            hotels.map(async (hotel) => {
                let saved = 'not saved';

                if (profileData) {
                    const savedHotels = profileData.saveall_id.Hotels;
                    const isSaved = savedHotels.some((savedHotel) => savedHotel.hotelid.toString() === hotel.hotel_id.toString());
                    saved = isSaved ? 'saved' : 'not saved';
                }

                return {
                    ...hotel.toObject(),
                    saved: saved
                };
            })
        );

        const totalPosts = result.length;
        const totalPages = Math.ceil(totalPosts / pageSize);

        if (page > totalPages) {
            return res.json([{ message: "You have reached the end" }]);
        }

        const skip = (page - 1) * pageSize;
        const pagedPosts = result.slice(skip, skip + pageSize);

        res.json([{
            page,
            pageSize,
            // totalPages,
            // totalPosts,
            posts: pagedPosts
        }]);
    } catch (error) {
        console.error(error);
        res.status(500).send([{ message: 'Something went wrong' }]);
    }
};
