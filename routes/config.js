// TODO
// if we want to allow configuration of the backend
var express = require('express');
var router = express.Router();

/* GET config */
router.get('/', function(req, res, next) {
  // e.g. read config/selfie.config.js
  res.send('ack');
});

/* POST config */
router.post('/', function(req, res, next) {
  res.send('ack');
});

module.exports = router;
