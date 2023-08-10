const { Router } = require('express');
const getPost = require('../../controllers/Feed/getPostCountWithDate');
const app = Router();
app.get('/mainFeed/getpostcount', getPost);
module.exports = app;