const { Router } = require('express');
const People = require('../../controllers/Explore/explorehotelSearch');
const app = Router();
app.get('/mainExplore/searchHotel/:keyword/:User_id', People);
module.exports = app;