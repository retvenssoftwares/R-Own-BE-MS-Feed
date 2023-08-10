const { Router } = require('express');
const getPost = require('../../controllers/Feed/getPostbyPostid');
const app = Router();
app.get('/mainFeed/getPost/:User_id/:post_id', getPost);
module.exports = app;