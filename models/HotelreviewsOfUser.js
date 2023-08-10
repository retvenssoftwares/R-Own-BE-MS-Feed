const shortid = require('shortid');
const mongoose = require('mongoose');
const moment = require('moment-timezone')
const hotelreviewsSchema = new mongoose.Schema({
    
    hotel_id:{ type: String , default: " "},
   user_id:{
    type: String
   },
    reviews_types:[{
        reviewsId:[{
            reviews_id:{
                type:String,default:""
            }
        }], 
        Full_name: {
            type: String,
            default: " "
        },
        Profile_pic: {
            type: String,
            default: " "
    
        },
        verificationStatus: String,

        Mesibo_account: [
            {
              uid: Number,
              address: String,
              token: String,
            },
          ],
        User_id:{
            type: String,
            default: " "
        },    
        Rating_number : { type: String , default: " "},
        Description :  { type: String , default: " "},
        date_added: {
            type: String,
            //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
        },
        display_status:{
            type:String,
            default:"1"
        }
        
    }],
    display_status:{
        type:String,
        default:"1"
    }


});

const hoteluserreviews = mongoose.model('hoteluserreviews', hotelreviewsSchema)
module.exports = hoteluserreviews;