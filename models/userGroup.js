const mongoose = require('mongoose');
const shortid = require("shortid");
const moment = require('moment-timezone')
const groupschema = new mongoose.Schema({

    creatorID:{
        type: String,
        default:""
    },
    creator_name:{
        type:String,
        default:""
    },
    group_name:{
        type:String,
        default:""
    },
    Profile_pic:{
        type:String,
        default:""
    },
    verificationStatus:String,
    description:{
          type:String,
          default:""
    },
    group_id:{
        type:String,
        default:""
    },
    location:{
        type:String,
        default:""
    },
    latitude:{
        type:String,
        default:""
    },
    longitude:{
        type:String,
        default:""
    },
    community_type:{
        type:String,
        default:""
    },
    Admin:[{
        user_id:{type: String, default: ""},
        Full_name:{type: String, default: ""},
        address:{type: String, default: ""},
        uid:{type: String, default: ""},
        Profile_pic:{type: String, default: ""},
        verificationStatus:{type: String, default: ""},
        location:{type: String, default: ""},
        Role:{type: String, default: ""},
        admin:{type:String,default:"true"}
    }],
    date_added: {
        type: String,
        // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    },
    Members:[{
        user_id:{type: String, default: ""},
        Full_name:{type: String, default: ""},
        address:{type: String, default: ""},
        uid:{type: String, default: ""},
        Profile_pic:{type: String, default: ""},
        verificationStatus:{type: String, default: ""},
        location:{type: String, default: ""},
        Role:{type: String, default: ""},
        admin:{type:String,default:"false"}
    }]
});
const userGroup = mongoose.model('userGroup',groupschema );
module.exports = userGroup;