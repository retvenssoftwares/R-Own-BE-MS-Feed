const mongoose = require('mongoose');
const shortid = require("shortid");
const job = new mongoose.Schema({
  user_id: {
    type: String
  },
  jobApplicants: [{
    user_id: String,
    applicationId: String
  }],


  jid: {
    type: String,
  },

  jobCategory: {
    type: String,

  },
  jobTitle: {
    type: String,

  },
  companyName: {
    type: String,

  },
  workplaceType: {
    type: String,

  },
  jobType: {
    type: String,

  },
  designationType: {
    type: String,

  },
  noticePeriod: {
    type: String,

  },
  expectedCTC: {
    type: String
  },
 
  jobLocation: {
    type: String,


  },
  jobDescription: {
    type: String,


  },
  skillsRecq: {
    type: String,

  },
  Bookmarked: [{
    user_id: String
      
  }],

  display_status: {
    type: String,
    default: "1"
  },

  vendorimg:{
    type:String
  },
  hotelLogoUrl:{
    type:String,
    default: ""
  },
  hotel_id:{
    type:String,
    default: ""
  }


})

const jobdata = mongoose.model('jobdata', job);

module.exports = jobdata;
