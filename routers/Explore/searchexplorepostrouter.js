const { Router } = require('express');
const getExplorepost = require('../../controllers/Explore/searchexplorepost');
const app = Router();
app.get('/mainExplore/getAllPostByCaption/:caption/:user_id', getExplorepost);
module.exports = app;