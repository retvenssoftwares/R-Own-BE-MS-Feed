const mongoose = require('mongoose');

//contact schema
const ContactSchema = new mongoose.Schema({
    User_id: {
        type: String
    },

    ContactDetails: [{
        Name: {
        type: String,
        required: false
    },
    Number: {
        type: String, required: false
    },
    Email: {
        type: String
    },
    Company_Name: {
        type: String
    },
    display_status:{
        type:String,
        default:"1"
    }
}]
})

const contacts = mongoose.model('contacts', ContactSchema);
module.exports = contacts;