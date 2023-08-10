const { Router } = require('express');
const Service = require('../../controllers/Explore/exploreSearchServices');
const app = Router();
app.get('/mainExplore/getSearchServices/:keyword', Service);
module.exports = app;