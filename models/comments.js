const mongoose = require('mongoose');
const shortid = require('shortid');
const moment = require('moment-timezone')
// comments schema
const commentSchema = new mongoose.Schema({
    user_id: { type: String },
    post_id: { type: String },
    
    comments: {

        type: [
            {
                user_id: String,
                comment: String,
                comment_id: { type: String, default: shortid.generate },
               date_added: {
                    type: String,
                   // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
                }, 
                Profile_pic:{type:String,default:""},
                User_name:{type:String,default:""},
                Full_name:{type:String,default:""},
                verificationStatus:{type:String,default:""},
                Role:{type:String,default:""},
                display_status:{
                    type:String,
                    default:"1"
                },
                replies: [
                    {
                        user_id:{type:String,default:""},
                        comment:{type:String,default:""},
                        comment_id: { type: String, default: shortid.generate },
                        parent_comment_id: { type: String },
                        date_added: {
                            type: String,
                            //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
                        },
                        Full_name: String,
                        display_status:{
                            type:String,
                            default:"1"
                        },
                        Profile_pic:{type:String,default:""},
                        User_name:{type:String,default:""},
                        Full_name:{type:String,default:""},
                        verificationStatus:{type:String,default:""},
                        Role:{type:String,default:""},
                    },
                ],
            },
        ],
        default: [],
    }
});

  const Comment = mongoose.model('comments', commentSchema);
  module.exports = Comment;