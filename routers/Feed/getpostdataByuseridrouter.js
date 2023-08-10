const { Router } = require('express');

const getalldata = require('../../controllers/Feed/getspecificPostbyUserid');
const app = Router();
app.get('/mainFeed/getSpecificPost/:user_id', getalldata)

module.exports=app;