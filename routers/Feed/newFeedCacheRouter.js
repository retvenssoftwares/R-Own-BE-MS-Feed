const { Router } = require('express');
const newFeed = require('../../controllers/Feed/newFeedCache');
const app = Router();

app.get('/mainFeed/getFeed/:user_id',newFeed);
module.exports = app;