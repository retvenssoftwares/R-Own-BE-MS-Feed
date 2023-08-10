const mongoose = require('mongoose');
const shortid = require('shortid');
//const moment = require('moment-timezone')
// Posts schema
const fileSchema = new mongoose.Schema({

    user_id: String,
    date_added: {
        type: String,
        // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    },

            posts: {
                type: [{
                    post_id: String,
                   
                    adminPostId: String,
                    isFetched: {
                        type: String,
                        default: "false"
                    },
                    whenWhatched: {
                        type: String
                    },
                }]
            }
    
   
  });
  
  const feedcache = mongoose.model('feedcache', fileSchema);
  module.exports = feedcache;
