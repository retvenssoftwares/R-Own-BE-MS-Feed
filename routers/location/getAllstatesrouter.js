const { Router } = require('express');
const getstates = require('../../controllers/location/getAllstates');
const app = Router();
app.get('/main/countries/:numeric_code/states', getstates);
module.exports = app;