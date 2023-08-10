const mongoose = require('mongoose');

const saveid = new mongoose.Schema({


    user_id:{
       type:String
    },
    saveall_id: {
        Posts: [{ postid: { type: String },User_name:{type: String, default: ""},location:{type: String, default: ""},caption:{type: String, default: ""},user_id:{type: String, default: ""},Full_name:{type: String, default: ""},Profile_pic:{type: String, default: ""},verificationStatus: {type: String, default: ""},media:[{post:{type: String, default: ""},date_added:{type:String}}],display_status:{type:String,default:"1"} }],
        Jobs: [{ jobid: { type: String  },user_id:{type: String, default: ""},jobTitle:{type: String, default: ""},hotelLogoUrl:{type: String, default: ""},expectedCTC:{type: String, default: ""},jobType:{type: String, default: ""},companyName:{type: String, default: ""},jobLocation:{type: String, default: ""},display_status:{type:String,default:"1"}}],
        Blogs: [{ blogid: {type: String, default: ""},user_id:{type: String, default: ""},blog_image:{type: String, default: ""},category_name:{type: String, default: ""},blog_title:{type: String, default: ""},Profile_pic:{type: String, default: ""},verificationStatus: {type: String, default: ""}, User_name:{type: String, default: ""},display_status:{type:String,default:"1"} }],
       
        Services: [{ serviceid: { type: String },user_id:{type: String, default: ""},vendorName:{type: String, default: ""}, vendorImage:{type: String, default: ""},location:{type: String, default: ""}, vendorServicePrice:{type: String, default: ""},Profile_pic:{type: String, default: ""},verificationStatus: {type: String, default: ""},User_name:{type: String, default: ""},display_status:{type:String,default:"1"} }],
       
       
        Events: [{ eventid: { type: String },user_id:{type: String, default: ""}, event_category:{type: String, default: ""}, event_title: {type: String, default: ""}, event_thumbnail: {type: String, default: ""}, event_start_date: {type: String, default: ""}, price: {type: String, default: ""}, Profile_pic:{type: String, default: ""}, verificationStatus: {type: String, default: ""}, User_name: {type: String, default: ""},display_status:{type:String,default:"1"}}],
      
        Hotels: [{ hotelid: { type: String },user_id:{type: String, default: ""}, hotelCoverpicUrl: {type: String, default: ""}, hotelAddress: {type: String, default: ""}, hotelName: {type: String, default: ""}, hotelRating: {type: String, default: ""}, display_status:{type:String,default:"1"}}],
    },

})

const saved = mongoose.model('save', saveid);
module.exports = saved;