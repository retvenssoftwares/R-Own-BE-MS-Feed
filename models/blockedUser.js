const mongoose = require('mongoose');

//hotel owner's schema
const blockedUserSchema = new mongoose.Schema({
    

  
    User_id: {
        type: String
    },
    blockedUser:[{
        user_id:{
            type:String,
        },
        Full_name:String,
        Profile_pic:String,
        verificationStatus: String,
        Role: String
    }]
})

const updateApp = mongoose.model('blockedUsers', blockedUserSchema);
module.exports = updateApp;