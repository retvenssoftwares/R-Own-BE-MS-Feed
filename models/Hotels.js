
const mongoose = require("mongoose");
const shortid = require("shortid");
// const moment = require('moment-timezone')
const hotel_list = new mongoose.Schema({
        user_id: {type: String, required: false},
        hotel_id: {type: String, default: shortid.generate},
        hotelName: { type: String, required: false },
        hotelAddress: { type: String, required: false },
        hotelRating: { type: String, required: false },
        hotelLogoUrl: { type: String, required: false, default: "" },
        // hotelProfilepicUrl: { type: String, required: false, default: "" },
        hotelCoverpicUrl: { type: String, required: false, default: "" },
        location:{type:String},
        bookingengineLink:{type:String},
        date_added: {
          type: String,
          //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
      },
        gallery:[{
          Image1:{type: String, default: ""},
          Image2:{type: String, default: ""},
          Image3:{type: String, default: ""}
        }],
        Hoteldescription:{type:String, default: "Please add your hotel's description"},
        display_status: {type: String, default: "1"}
      });
      

const Hotels = mongoose.model('Hotels', hotel_list);

module.exports = Hotels;

// const mongoose = require("mongoose");
// const shortid = require("shortid");

// const hotel_list = new mongoose.Schema({
//         user_id: {type: String, required: false},
//         hotel_id: {type: String, default: shortid.generate},
//         hotelName: { type: String, required: false },
//         hotelAddress: { type: String, required: false },
//         hotelRating: { type: String, required: false },
//         hotelLogoUrl: { type: String, required: false, default: "" },
//         // hotelProfilepicUrl: { type: String, required: false, default: "" },
//         hotelCoverpicUrl: { type: String, required: false, default: "" },
//         location:{type:String},
//         date_added: { type: Date, default: Date.now },
//         galleryImage1:String,
//         galleryImage2:String,
//         galleryImage3:String,
//         Hoteldescription:{type:String, default: "Please add your hotel's description"},
//         display_status: {type: String, default: "1"}
//       });
      

// const Hotels = mongoose.model('Hotels', hotel_list);

// module.exports = Hotels;
