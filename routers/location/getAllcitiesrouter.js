const { Router } = require('express');
const getcities = require('../../controllers/location/getAllcities');
const app = Router();
app.get('/main/countries/:numeric_code/states/:state_code/cities', getcities);
module.exports = app;