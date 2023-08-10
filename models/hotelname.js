const mongoose = require("mongoose");
const shortid = require("shortid");

const hotelSchema = new mongoose.Schema({
    hotelname_id: {
        type: String,
        default: shortid.generate
    },
    hotel_name: {
        type: String
    },
    display_status: {
        type: String,
        default:"1"
    }
    
})

const Hotel = mongoose.model('hotelname', hotelSchema);
module.exports = Hotel;