const mongoose = require('mongoose');
const shortid = require("shortid");
const moment = require('moment-timezone');
const notifySchema = new mongoose.Schema({


    user_id: {
        type: String,
        default: ""
    },

    
    notifications: {
        likesNotification: [{ post_id: { type: String },post_type:{ type: String}, body: { type: String }, Profile_pic: { type: String }, Full_name: { type: String },user_id:{type : String} , User_name:{type : String},verificationStatus:{type : String},date_added: {
            type: String,
           // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
        },Media:{type:String} }],
        commentNotification: [{ post_id: { type: String },post_type:{ type: String}, body: { type: String }, Profile_pic: { type: String }, Full_name: { type: String },user_id:{type : String} , User_name:{type : String} ,verificationStatus:{type : String}, comment_id : {type: String},date_added: {
            type: String,
           // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
        },Media:{type:String}}],
        requestNotification: [{ body: { type: String }, Role: {type: String}, Profile_pic: { type: String },verificationStatus:{type : String}, Full_name: { type: String },user_id:{type : String} , User_name:{type : String},date_added: {
            type: String,
            // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
        },}],
        acceptNotification: [{ body: { type: String }, Role: {type: String}, Profile_pic: { type: String },verificationStatus:{type : String}, Full_name: { type: String },user_id:{type : String} , User_name:{type : String},date_added: {
            type: String,
            //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
        },}],
        JobNotifications: [{ body: { type: String }, Full_name: { type: String },user_id:{type : String},date_added: {
            type: String,
            //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
        }, }],
        CallNotifications: [{ body: { type: String }, Full_name: { type: String },user_id:{type : String}, callType: {type: String},Profile_pic:{type: String},verificationStatus:{type : String},date_added: {
            type: String,
            // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
        } }]
    }
});
const userNotification = mongoose.model('notification', notifySchema);
module.exports = userNotification;