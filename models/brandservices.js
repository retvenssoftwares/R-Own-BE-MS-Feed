const mongoose = require("mongoose");
const shortid = require("shortid");

const serviceSchema = new mongoose.Schema({
    serviceId: {
        type: String,
        default: shortid.generate
    },
    service_name: {
        type: String
    },
    display_status: {
        type: String,
        default:"1"
    }
    
})

const service = mongoose.model('servicename', serviceSchema);
module.exports = service;