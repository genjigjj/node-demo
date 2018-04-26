var express = require('express');
var router = express.Router();
var getData = require('../api/test')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/ajax/test',function (req, res,next) {
  var data = getData()
  var ajaxTest={
    tips:"you are not alone,me too"
  };
  res.send(data);
})

module.exports = router;
