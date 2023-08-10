const { Router } = require('express');

const getalldata = require('../../controllers/Feed/getpollsvotebypostid');
const app = Router();
app.get('/mainFeed/getPollsVotes/:post_id', getalldata)

module.exports=app;