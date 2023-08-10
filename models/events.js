const mongoose = require("mongoose");
const shortid = require("shortid");
const moment = require('moment-timezone')
const eventSchema = new mongoose.Schema({
    event_id: {
        type: String,
        default: shortid.generate
    },
    category_id: {
        type: String,
        default:""
    },
    Profile_pic:{
        type: String,
        default:""
    },
    User_name: {
        type: String,
        default:""
    },
    Full_name:{
        type: String,
        default:""
    },
    verificationStatus :String,
    category_name:{
        type: String,
        default:""
    },
    User_id: {
        type: String,
        default:"",
    },

    location: {
        type: String,
        default:""
    },
    venue: {
        type: String,
        default:""
    },
    country: {
        type: String,
        default:""
    },
    state: {
        type: String,
        default:""
    },
    city: {
        type: String,
        default:""
    },
    event_title: {
        type: String,
        default:""
    },
    event_description: {
        type: String,
        default:""
    },
    event_category: {
        type: String,
        default:""
    },
    email: {
        type: String,
        default:""
    },
    phone: {
        type: String,
        default:""
    },
    website_link: {
        type: String,
        default:""
    },
    booking_link: {
        type: String,
        default:""
    },
    price: {
        type: String,
        default:""
    },
    event_thumbnail: {
        type: String,
        default:""
    },
    event_start_date: {
        type: String,
        default:""
    },
    event_start_time: {
        type: String,
        default:""
    },
    event_end_date: {
        type: String,
        default:""
    },
    event_end_time: {
        type: String,
        default:""
    },
    registration_start_date: {
        type: String,
        default:""
    },
    registration_start_time: {
        type: String,
        default:""
    },
    registration_end_date: {
        type: String,
        default:""
    },
    registration_end_time: {
        type: String,
        default:""
    },
    date_added: {
        type: String,
        //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    },
    display_status:{
        type:String,
        default:"1"
    },
    

})

const event = mongoose.model('event', eventSchema);
module.exports = event;