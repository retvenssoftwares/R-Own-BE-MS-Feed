const { Router } = require('express');
const getExplorepost = require('../../controllers/Explore/explorehotel');
const app = Router();
app.get('/mainExplore/getExploreHotel/:User_id', getExplorepost);
module.exports = app;