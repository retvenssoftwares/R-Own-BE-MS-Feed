const { Router } = require('express');
const service = require('../../controllers/Explore/exploreServices');
const app = Router();
app.get('/mainExplore/getService', service);
module.exports = app;