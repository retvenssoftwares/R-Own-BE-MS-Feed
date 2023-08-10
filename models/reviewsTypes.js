const shortid = require('shortid');
const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
   quickReviewImage:{
    type:String,
    default:""
   },
    reviews_name :{
    type: String,
    default: ""
   },
   reviews_id:{
    type: String,
    default: shortid.generate
},
review_count:[{
    User_id:{type:String,default:""},
numberOfUser:[{
    user_id:{
        type: String,
      default: " "
    },  

}],
}],

display_status:{
    type:String,
    default:"1"
}
});
const reviews =  mongoose.model('quickreviews', reviewsSchema )
module.exports = reviews;