const { Router } = require('express');
const calls = require('../../controllers/Mesibo/callingNotify')
const app = Router();

app.post('/main/call/:User_id', calls);

module.exports = app;