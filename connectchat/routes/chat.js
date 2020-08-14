var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/chat', function(req, res, next) {
  console.log('6666');
  console.log(req.user);
  res.send({data:req.user})
});

module.exports = router;
