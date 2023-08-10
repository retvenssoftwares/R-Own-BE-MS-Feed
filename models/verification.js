const mongoose = require('mongoose');
const moment = require('moment-timezone');
const shortid = require('shortid');

// Posts schema
const verificationSchema = new mongoose.Schema({
    user_id: { type: String, required: false,
    default: "" },
    verification_id: { type: String, default: shortid.generate },
    date_added: {
        type: String,
        // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    },
    CountryorRegion: { type: String, default: "" },
    Category: {
        type: String,
        default: ""
    },
    Full_name: {
        type: String,
        default: ""
    },
    User_name: {
        type: String,
        default: ""
    },
    Documents: [{ document: String, date_added: { type: String } }],

});


const Document = mongoose.model('verificationdocuments', verificationSchema);
module.exports = Document;