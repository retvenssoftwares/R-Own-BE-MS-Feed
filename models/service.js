const shortid = require('shortid');
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const ServicesSchema = new mongoose.Schema({
    user_id:{
        type: String,
        default: ""    
    },

    serviceId: {
        type: String,
        default: ""
    },
        vendorServicePrice: {
            type: String,
            default: ""
        },
        Profile_pic: {type: String, default: ""},
        User_name: {type: String, default: ""},
        vendorName: {type: String, default: ""},
        vendorImage: {type: String, default: ""},
        location: {type: String, default: ""},
        service_name: {type: String, default: ""},
        verificationStatus:{type: String, default: ""},
        vendorServiceId:{
            type: String,
            
        },
        display_status: {
            type: String,
            default:"1"
        },

       
      
   
   
});

const service =  mongoose.model('service', ServicesSchema )
module.exports = service;