const mongoose = require('mongoose');
const shortid = require("shortid");
//hotel owner's schema
const appSchema = new mongoose.Schema({

    update_id:{
        type: String,
        default: shortid.generate,
    },
    displayStatus: {
        type: String,
        default: "1"
    },

    updateDescription: {
        type: String
    },

    Android_version:{
        type:String
    },

    iOS_version:{
        type:String
    },

    updateTitle: {
        type: String
    },
    updateLink: {
        type: String
    },
    appStore:{
        type:String
    },
    playStore:{
        type:String
    },
    iOSUpdateLink:{
        type:String
    }

})

const updateApp = mongoose.model('updates', appSchema);
module.exports = updateApp;