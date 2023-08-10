const { Router } = require('express');
const getconpost = require('../../controllers/Feed/getpostofcoon');
const app = Router();
app.get('/mainFeed/getConnPost/:user_id', getconpost);
module.exports = app;