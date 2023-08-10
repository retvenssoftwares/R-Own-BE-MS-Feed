const { Router } = require('express');
const getlike = require('../../controllers/Feed/getLikebypostid');
const app = Router();
app.get('/mainFeed/fetchLike/:post_id', getlike);
module.exports = app;