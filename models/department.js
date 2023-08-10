const mongoose = require("mongoose");
const shortid = require("shortid");

const department = new mongoose.Schema({
    department_id: {
        type: String,
        default: shortid.generate
    },
    department: {
        type: String
    },
    display_status: {
        type: String,
        default:"1"
    }
    
})

const department_data = mongoose.model('department_data', department);
module.exports = department_data;