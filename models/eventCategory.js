
const mongoose = require("mongoose");
const shortid = require("shortid");
const moment = require('moment-timezone')
const eventSchema = new mongoose.Schema({
    category_id: {
        type: String,
        default: shortid.generate
    },
    category_name: {
        type: String
    },
    Image:{
        type:String
    },
    display_status: {
        type: String,
        default: "1"
      },
      date_added: {
        type: String,
        default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    }
    
})

const event = mongoose.model('eventcategory', eventSchema);
module.exports = event;