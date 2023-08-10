const { Router } = require('express');
const getcomment = require('../../controllers/Feed/getComment');
const app = Router();
app.get('/mainFeed/comment/:post_id', getcomment);
module.exports = app;