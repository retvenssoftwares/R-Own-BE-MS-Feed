const shortid = require('shortid');

const mongoose = require('mongoose');

const UserreviewsSchema = new mongoose.Schema({
  
    User_id:{ type: String , default: " "},
    userReviews:[{

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
        user_id:{
            type: String,
          default: " "
        },    
        Rating_number : { type: String , default: " "},
        Description :  { type: String , default: " "},
        date_added: {
            type: String,
            
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

const userreviews = mongoose.model('vendorreviews', UserreviewsSchema)
module.exports = userreviews;