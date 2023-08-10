const { Router } = require('express');
const blog = require('../../controllers/Explore/exploreBlog');
const app = Router();
app.get('/mainExplore/getBlog/:User_id', blog);
module.exports = app;