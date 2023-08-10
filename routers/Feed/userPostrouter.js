const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const feed = require('../../controllers/Feed/post');
const app = Router();
app.post('/mainFeed/post/:User_id', upload.array('media'),feed)

module.exports=app;