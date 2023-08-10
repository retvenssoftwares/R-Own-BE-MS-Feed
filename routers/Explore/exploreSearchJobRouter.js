const { Router } = require('express');
const exploreSearchJob = require('../../controllers/Explore/exploreSearchJobs');
const app = Router();
app.get('/mainExplore/getSearchJob/:keyword/:User_id', exploreSearchJob);
module.exports = app;