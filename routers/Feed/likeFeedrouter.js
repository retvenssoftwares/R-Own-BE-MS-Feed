const { Router } = require('express');
const liked = require('../../controllers/Feed/likeFeedapi');
const app = Router();

app.patch('/mainFeed/like/:post_id',liked );
module.exports = app;