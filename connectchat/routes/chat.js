var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/getmyinfo', function(req, res, next) {
  res.send({data:req.user})
});

module.exports = router;
