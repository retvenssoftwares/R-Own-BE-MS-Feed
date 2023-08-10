const { Router } = require('express');
const chatdata = require('../../controllers/Mesibo/ChatMessage')
const app = Router();

app.post('/main/chating/:User_id', chatdata);

module.exports = app;