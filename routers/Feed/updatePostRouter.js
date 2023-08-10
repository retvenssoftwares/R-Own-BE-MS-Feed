const multer = require('multer');
const upload = multer();
const { Router } = require('express');
const updatepost = require('../../controllers/Feed/updatePost');
const app = Router();

app.patch('/mainFeed/editPost/:post_id', updatepost)
module.exports = app;