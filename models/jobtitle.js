const mongoose = require("mongoose");
const shortid = require("shortid");

const jobSchema = new mongoose.Schema({
    jid: {
        type: String,
        default: shortid.generate
    },
    job_title: {
        type: String
    },
    display_status: {
        type: String,
        default:"1"
    }
})

const job = mongoose.model('jobtitle', jobSchema);
module.exports = job;