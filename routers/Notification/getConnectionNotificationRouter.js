const { Router } = require('express');
const getconnectionNotifs = require('../../controllers/Notifications/getConnectionNotification');
const app = Router();
app.get('/main/getConnectionNotification/:user_id', getconnectionNotifs);
module.exports = app;