const mongoose = require('mongoose');
const shortid = require('shortid');
const moment = require('moment-timezone')
// Posts schema
const postSchema = new mongoose.Schema({

  user_id: { type: String, required: false, default: "" },
  caption: { type: String },
  adminpostId: {type: String, default: shortid.generate},
      adminStatus:{
            type:String,
            default:""
          },
  date_added: {
    type: String,
    //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
},
  location: {type:String, default:""},
  post_type:{
    type:String
  },
  Can_See:{
    type:String,
    default: ""
  },
  hotel_id:{
    type:String,
    default: ""
  },
  hotelAddress:{
    type:String,
    default: ""
  },
  hotelName:{
    type:String,
    default: ""
  },
  hotelCoverpicUrl:{
    type:String,
    default: ""
  },
  hotelLogoUrl:{
    type:String,
    default: ""
  },
  bookingengineLink:{
    type:String,
    default: ""
  },
  Can_comment:{
    type:String,
    default: ""
  },
  Event_location:{
    type: String,
    default: ""
  },
  Event_name: {
    type: String,
    default: ""
  },
  checkinLocation: {
    type: String,
    default: ""
  },
  checkinVenue: {
    type: String,
    default: ""
  },
  jobTitle:{
    type:String,
    default:""
  },
  pollQuestion: {
    type: [
      {
        Question: String,
        question_id: { type: String, default: shortid.generate },
        date_added: {
          type: String,
          //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
      },
        Options: [
          {
            Option: String,
            option_id: { type: String, default: shortid.generate },
            votes: [{ user_id: String,Full_name:String,Role:String }],
            date_added: {
              type: String,
              //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
          },
          },
        ],
      },
    ],
    default: [],
  },
  display_status:{
    type:String,
    default:"1"
  },
  
  event_id:{
    type:String,
    default: ""
  },

  media: [{post: String, date_added: {
    type: String,
    //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
}}],
  saved_post:[{user_id:String}],
  Profile_pic:String,
  User_name:String,
  Full_name:String,
  Role:String,
  event_thumbnail:{type:String,default:""},
  price: String,
  event_start_date: String,
  verificationStatus: String,
  jobTitle: { type:String, default: ""}
  });
  
  const Post = mongoose.model('adminpost', postSchema);
  module.exports = Post;