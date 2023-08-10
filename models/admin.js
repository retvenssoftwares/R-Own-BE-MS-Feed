const mongoose = require('mongoose');

///hotel owner's schema
const UserSchema = new mongoose.Schema({
    Email: {
        type: String,
        default: "",
        required: true
    },

    Password: {
        default: "",
        type: String, required: true
    }
})


const admin = mongoose.model('admin', UserSchema);
module.exports = admin;

