const { Router } = require('express');
const Event = require('../../controllers/Explore/exploreEvent');
const app = Router();
app.get('/mainExplore/event/:User_id', Event);
module.exports = app;