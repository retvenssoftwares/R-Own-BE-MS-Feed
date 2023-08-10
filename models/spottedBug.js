const mongoose = require('mongoose');
const moment = require('moment-timezone')
///hotel owner's schema
const spottedbugSchema = new mongoose.Schema({
  
    description_bug: {
        type: String,
        default:""
      
    },
    images:[{
        img:{type: String, default: ""}
      }],
    Date:{type: String,
        // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss"),
    }
})


const spottedbug = mongoose.model('spottedbug', spottedbugSchema);
module.exports = spottedbug;