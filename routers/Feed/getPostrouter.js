const { Router } = require('express');
const getpost = require('../../controllers/Feed/getPost');
const app = Router();
app.get('/mainFeed/post/:post_id', getpost);
module.exports = app;