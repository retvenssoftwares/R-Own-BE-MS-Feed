const { Router } = require('express');
const getExplorepost = require('../../controllers/Explore/explorePosts');
const app = Router();
app.get('/mainExplore/getExplorePosts/:user_id', getExplorepost);
module.exports = app;