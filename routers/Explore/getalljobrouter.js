const { Router } = require('express');
const getExplorepost = require('../../controllers/Explore/getalljob');
const app = Router();
app.get('/mainExplore/getAllJob', getExplorepost);
module.exports = app;