const { Router } = require('express');
const People = require('../../controllers/Explore/explorePeoplesearch');
const app = Router();
app.get('/mainExplore/searchPeople/:keyword/:User_id', People);
module.exports = app;