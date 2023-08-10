
const mongoose = require("mongoose");
const shortid = require("shortid");

const companySchema = new mongoose.Schema({
    company_id: {
        type: String,
        default: shortid.generate
    },
    company_name: {
        type: String
    },
     addedbyUser: {
        type: String,
        default: "false"
    },
})

const Company = mongoose.model('company', companySchema);
module.exports = Company;