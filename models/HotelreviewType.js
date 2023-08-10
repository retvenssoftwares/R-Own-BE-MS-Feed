const shortid = require('shortid');
const mongoose = require('mongoose');

const reviewhotel = new mongoose.Schema({
   reviews_name :{
    type: String
   },

   quickreview_pic:{
    type:String
   },

   reviews_id:{
    type: String,
    default: shortid.generate
},

review_count:[{
    hotel_id:{type:String,default:""},
numberOfUser:[{
    User_id:{
        type: String,
      default: " "
    },  

}],
}],

display_status:{
    type:String,
    default : "1"
}
    
   
});

const hotelreviews =  mongoose.model('hotelreviews', reviewhotel )
module.exports = hotelreviews;