const { Router } = require('express');
const Event = require('../../controllers/Explore/exploreSearchEvents');
const app = Router();
app.get('/mainExplore/getSearchEvents/:keyword/:User_id', Event);
module.exports = app;