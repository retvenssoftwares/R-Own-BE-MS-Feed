const mongoose = require('mongoose');
const shortid = require('shortid');
const moment = require('moment-timezone')
// Posts schema
const likeSchema = new mongoose.Schema({
    post_id:{type:String},
    user_id:{type:String},
    
    likes: {type:[{user_id:String,jobTitle: {type: String},date_added: {
      type: String,
      //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
  },Profile_pic:{type:String,default:""},User_name:{type:String,default:""},verificationStatus:{type:String,default:""}, Role:{type:String,default:""}, Full_name:{type:String,default:""},display_status:{type:String,default:"1" }}]},
    
  });
  
  const like = mongoose.model('like', likeSchema);
  module.exports = like;