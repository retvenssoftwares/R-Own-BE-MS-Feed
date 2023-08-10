const { Router } = require('express');
const People = require('../../controllers/Explore/explorePeople');
const app = Router();
app.get('/mainExplore/getPeople/:User_id', People);
module.exports = app;