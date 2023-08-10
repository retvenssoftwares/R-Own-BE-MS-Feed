const mongoose = require("mongoose");
const shortid = require("shortid");

const jobApplicationSchema = new mongoose.Schema({
user_id:{ type: String,default:""},
Full_name:{type:String,default:""},
Experience:{type:String,default:""},
resume: {type:String,default:""},
jid:{type:String,default:""},
applicationId: {type: String, default: shortid.generate},
status:{type:String,default:"Applied"} ,
self_introduction:{
    type:String,
    default:""
},
display_status:{
    type:String,
    default:"1"
}
});

const jobApplication = mongoose.model('jobapplications', jobApplicationSchema);
module.exports = jobApplication;