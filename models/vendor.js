const shortid = require('shortid');
const mongoose = require('mongoose');

const vendorServicesSchema = new mongoose.Schema({
    user_id: {
        type: String,
        default: ""
    },
   
    vendorServiceName: [{
        Name:{ type: String, default: ""},
        vendorServiceId:{
            type: String,
            default: shortid.generate
        },
        Price:{type:String},
      
    }],
    display_status: {
        type: String,
        default:"1"
    }
});

const Vendor =  mongoose.model('vendors', vendorServicesSchema )
module.exports = Vendor;