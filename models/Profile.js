
const mongoose = require("mongoose");
const shortid = require("shortid");
const moment = require('moment-timezone')
//const validator=require("validator");


const profileschema = new mongoose.Schema({

    Full_name: {
        type: String,
        // required:true
        default: ""
    },
    User_id: {
        type: String,
        default: shortid.generate,
    },
    Email: {
        type: String,
        // required:true
        default: ""
    },
    Bookmarkjob: [{
        jid: String
    }],

    Phone: {
        type: String,
        required: true
    },
    Profile_pic: {
        type: String,
        //required:true
        default: ""
    },
    resume: {
        type: String,
        //required:true
        default: ""
    },
    Mesibo_account: [{
        uid: Number,
        address: String,
        token: String
    }],
    Interest: [{
        intid: String,
    }],
    verificationStatus: { type: String, default: "false"},

    userBio: { type: String, default: "" },
    

    

    post_count: { type: [{ post_id: String, date_added: {
        type: String,
        default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    }}] },

   
    connections: {
        type: [{
            user_id: String, date_added: {
                type: String,
                // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
            },display_status:{type:String,default:"1"}
        }]
    },
    pending_request: {
        type: [{
            user_id: String, date_added: {
                type: String,
                default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
            },
        }]
    },
    Created_On: { type: String,
        // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss") 
    },
    

    requests: { type: [{ user_id: String, date_added: {
        type: String,
        // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    },display_status:{type:String,default:"1"} }] },
    pending_request: { type: [{ user_id: String, date_added: {
        type: String,
        default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    } }] },
    

    //patch
    saved_post: [{ post_id: String }],
    Liked_post: [{ post_id: String }],

    User_name: {
        type: String,
        default: "",
    },

    DOB: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    profileCompletionStatus: {
        type: String,
        default: "50"
    },
    Role: {
        type: String,
        default: "Normal User"
    },
    device_token: {
        type: String,
        default: ""
    },
    Gender:{
        type:String,
    },
    studentEducation: [{
        educationPlace: { type: String, default: "" },
        education_session_start: { type: String, default: "" },
        education_session_end: { type: String, default: "" },
    }],
    normalUserInfo: [{
        jobType: { type: String, default: "" },
        jobTitle: { type: String, default: "" },
        jobCompany: { type: String, default: "" },
        jobStartYear: { type: String, default: "" },
        jobEndYear: { type: String, default: "" },
        
    }],

    hospitalityExpertInfo: [{
        userDescription: { type: String, default: "" },
        jobtype: { type: String, default: "" },
        jobtitle: { type: String, default: "" },
        hotelCompany: { type: String, default: "" },
        jobstartYear: { type: String, default: "" },
        jobendYear: { type: String, default: "" },
    }],
    hotelOwnerInfo: {
        hotelownerid: { type: String, default: shortid.generate, },
        hotelownerName: { type: String, default: "" },
        hotelDescription: { type: String, default: "" },
        hotelType: { type: String, default: "" },
        hotelCount: { type: String, default: "" },
        websiteLink: { type: String, default: "" },
        bookingEngineLink: { type: String, default: "" },
        hotelInfo: [{
            hotel_id: { type: String, default: "" },

        }]

    },
    // saveall_id: {
    //     Posts: [{ postid: { type: String }, }],
    //     Jobs: [{ jobid: { type: String  }, }],
    //     Blogs: [{ blogid: { type: String}, }],
    //     Events: [{ eventid: { type: String }, }],
    //     Services: [{ serviceid: { type: String }, }],
    //     Hotels: [{ hotelid: { type: String }, }],
    // },

    vendorInfo: {
       // vendor_id: { type: String, default: shortid.generate },
        vendorImage: { type: String, default: "" },
        vendorName: { type: String, default: "" },
        vendorDescription: { type: String, default: "" },
        vendorServices: [
            {
               vendorServiceId: { type: String, default: "" },
               serviceId: { type: String, default: "" }, 
               service_name: String
            }
        ],
       portfolioLink:[{ 
        Image1:{type: String, default: ""},
        Image2:{type: String, default: ""},
        Image3:{type: String, default: ""}
    }] ,
        websiteLink: { type: String, default: "" },
    },
display_status: {type: String, default: "1"}


});
//profile model
const Profile = mongoose.model('Profile', profileschema);
module.exports = Profile;