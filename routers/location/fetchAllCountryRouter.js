const { Router } = require('express');
const country = require('../../controllers/location/fetchAllCountry');
const app = Router();
app.get('/main/fetchCountry', country);
module.exports = app;