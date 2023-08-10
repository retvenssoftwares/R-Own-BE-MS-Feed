const mongoose = require("mongoose");

const shortid = require("shortid");
const jobrequest_schema = new mongoose.Schema({
    
        userID:{
            type: String
        },     
        requestjob_id:{
            type: String,
            default: shortid.generate
        },
        designationType: {
            type:String
        },
        noticePeriod:{
            type:String
        },
        department:{
            type:String
        },
       
        preferredLocation:{
            type:String
        },
        
        expectedCTC:{
            type:String
        },
        employmentType:{
            type:String
        },
        status:{
            type:String,
            default: "not requested"
        },
        display_status:{
            type:String,
            default:"1"
        }
      
})

const jobrequest = mongoose.model('jobrequest', jobrequest_schema);
module.exports = jobrequest;