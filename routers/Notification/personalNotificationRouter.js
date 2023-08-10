const { Router } = require('express');
const getpersonalNotifs = require('../../controllers/Notifications/personalNotifications');
const app = Router();
app.get('/main/getPersonalNotification/:user_id', getpersonalNotifs);
module.exports = app;