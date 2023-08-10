const { Router } = require('express');
const getpost = require('../../controllers/Feed/getAllpost');
const app = Router();
app.get('/mainFeed/getPost', getpost);
module.exports = app;