const mongoose = require('mongoose');
const shortid = require('shortid');
const moment = require('moment-timezone')
///hotel owner's schema
const faqSchema = new mongoose.Schema({
   
   faqId:{
    type: String,
    default: shortid.generate
   },
    question: {
        type: String,
        default:""
      
    },

    answer: {
        type: String,
        default:""
    },
    display_status:{
        type:String,
        default:"1"
    },

    Date: {
        type: String,
        //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    },
})


const faq = mongoose.model('FAQ', faqSchema);
module.exports = faq;