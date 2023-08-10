
const mongoose = require("mongoose");
const shortid = require("shortid");

const designationSchema = new mongoose.Schema({
    designation_id: {
        type: String,
        default: shortid.generate
    },
    designation_name: {
        type: String
    },
    addedbyUser: {
        type: String,
        default: "false"
    },
    userid: { type: String },
    display_status:{
        type:String,
        default:"1"
    }

})

const Designation = mongoose.model('designation', designationSchema);
module.exports = Designation;