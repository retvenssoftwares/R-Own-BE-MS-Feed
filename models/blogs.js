
const mongoose = require("mongoose");
const shortid = require("shortid");
const moment = require("moment-timezone");

const blogSchema = new mongoose.Schema({
    blog_id: {
        type: String,
        default: shortid.generate
    },
    blog_image: {
        type: String,
        default:"",
    },
    Profile_pic: {
        type: String,
        default:"",
    },
    User_name: {
        type: String,
        default:"",
    },
    Full_name:{
        type: String,
        default:"",
    },
    verificationStatus: String,
    category_name:{
        type: String,
        default:"",
    },
    blog_title: {
        type: String,
        default:""
    },
    blog_content: {
        type: String,
        default:""
    },
    category_id: {
        type: String,
        default:""
    },

    User_id: {
        type: String,
        default:""
    },
    date_added: {
        type: String,
       // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    },
  
    likes: {type:[{user_id:String}]},

    comments:{
         type: [
            { 
            user_id: String, 
            comment: String , 
            User_name:String,
            Full_name: String,
            Profile_pic:String,
            verificationStatus:String,
            Full_name:String,
            Role: String,
            comment_id: {type: String, default: shortid.generate},
            display_status: {type: String, default: "1"},
            date_added: {
                type: String,
                //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
            },
            replies: [
                {
                  user_id: String,
                  comment: String,
                  User_name:String,
                  Full_name: String,
                  Profile_pic:String,
                  verificationStatus:String,
                  Full_name:String,
                  Role: String,
                  comment_id: { type: String, default: shortid.generate },
                  parent_comment_id: { type: String },
                  display_status: {type: String, default: "1"},
                  date_added: {
                    type: String,
                    //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
                },
                },
              ],
        }
    ], 
      
   },
   display_status: {type: String, default: "1"},

    saved_blog:[{blog_id:String}], 
    


})

const blog = mongoose.model('blog', blogSchema);
module.exports = blog;