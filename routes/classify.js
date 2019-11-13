// TODO
// if we want to process the image on our side
var express = require('express');
var router = express.Router();

/* POST classify */
router.post('/', function(req, res, next) {
  // e.g. send the image to a 3rd party prediction API
  res.send('ack');
});

module.exports = router;
