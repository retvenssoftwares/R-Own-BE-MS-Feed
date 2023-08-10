const { Router } = require('express');
const commentFeed = require('../../controllers/Feed/commentFeed');
const app = Router();
app.patch('/mainFeed/postComment/:post_id', commentFeed);
module.exports = app;