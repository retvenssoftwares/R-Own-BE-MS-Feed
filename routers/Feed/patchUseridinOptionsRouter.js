const { Router } = require('express');
const patchUID = require('../../controllers/Feed/patchUseridinOptions');
const app = Router();
app.patch('/mainFeed/polls/:post_id/:option_id', patchUID);
module.exports = app;