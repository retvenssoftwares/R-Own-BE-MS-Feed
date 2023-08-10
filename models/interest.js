
const mongoose = require("mongoose");
const shortid = require("shortid");

// Define the Interest schema
const interestSchema = new mongoose.Schema({
  
    Name:{
     type:String
    },
    id:{
        type:String, 
        default:shortid.generate
    },
    User_list: [String],
  });
  
  // Create a Mongoose model from the Interest schema
  const Interest = mongoose.model('Interest', interestSchema);
  module.exports = Interest;