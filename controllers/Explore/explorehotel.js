

// const Hotel = require('../../models/Hotels');
// const Profile = require('../../models/Profile');

// module.exports = async (req, res) => {
//     try {
//         const pageSize = 15;
//         const page = parseInt(req.query.page) || 1; // Use req.query.page to get the current page number

//         const skip = (page - 1) * pageSize;
//         const hotels = await Hotel.find({}, 'hotelName hotelLogoUrl hotelRating hotel_id location');


//         const totalPosts = hotels.length;

//         const pagedPosts = hotels.slice(skip, skip + pageSize);

//         if (pagedPosts.length > 0) {
//             res.json([{
//                 posts: pagedPosts
//             }]);
//         } else {
//             res.json({ message: 'You have reached the end' });
//         }

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

const Hotel = require('../../models/Hotels');
const Profile = require('../../models/saved');
//const review = require('../../models/HotelreviewsOfUser');
module.exports = async (req, res) => {
    try {
        const pageSize = 15;
        const page = parseInt(req.query.page) || 1; // Use req.query.page to get the current page number

        const skip = (page - 1) * pageSize;
        const hotels = await Hotel.find({}, 'hotelName hotelLogoUrl hotelCoverpicUrl hotelRating hotel_id location hotelAddress display_status').sort({date_added:-1});

        const profileData = await Profile.findOne({ user_id: req.params.User_id });

        const result = await Promise.all(
            hotels.map(async (hotel) => {
                let saved = 'not saved';

                if (profileData) {
                    const savedHotels = profileData.saveall_id.Hotels;
                    const isSaved = savedHotels.some((savedHotel) => savedHotel.hotelid.toString() === hotel.hotel_id.toString());
                    saved = isSaved ? 'saved' : 'not saved';
                }

                // const reviews = await review.findOne({ hotel_id: hotel.hotel_id });
                // let averageRating = 0;

                // if (reviews) {
                //     const totalReviews = reviews.reviews_types.length;
                //     let sumRating = 0;

                //     reviews.reviews_types.forEach((reviewType) => {
                //         sumRating += parseFloat(reviewType.Rating_number);
                //     });

                //     averageRating = sumRating / totalReviews;
                // }

                return {
                    ...hotel.toObject(),
                    saved: saved,
                    //averageRating: averageRating
                };
            })
        );

        const totalPosts = result.length;

        const pagedPosts = result.slice(skip, skip + pageSize);

        if (pagedPosts.length > 0) {
            res.json([{
                page,
                pageSize,
                posts: pagedPosts
            }]);
        } else {
            res.json([{ message: 'You have reached the end' }]);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
