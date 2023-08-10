const mongoose = require("mongoose");
const shortid = require("shortid");
const moment = require("moment-timezone");

const blogSchema = new mongoose.Schema({
    category_id: {
        type: String,
        default: shortid.generate
    },
    category_name: {
        type: String
    },
    Image: {
        type: String
    },
    date_added: {
        type: String,
        default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    }
});

const Blog = mongoose.model('blogcategory', blogSchema);
module.exports = Blog;
