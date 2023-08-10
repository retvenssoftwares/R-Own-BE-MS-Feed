const { Router } = require('express');
const post = require('../../controllers/Feed/savedPost');
const app = Router();

app.patch('/mainFeed/save_post/:post_id', post);
module.exports = app;