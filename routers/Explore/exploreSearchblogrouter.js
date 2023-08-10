const { Router } = require('express');
const People = require('../../controllers/Explore/exploreSearchblog');
const app = Router();
app.get('/mainExplore/searchBlog/:keyword/:User_id', People);
module.exports = app;