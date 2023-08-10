const { Router } = require('express');
const replyFeed = require('../../controllers/Feed/replyComment');
const app = Router();
app.patch('/mainFeed/commentReply/:post_id', replyFeed);
module.exports = app;