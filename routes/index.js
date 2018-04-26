const express = require('express');
const router = express.Router();
const getVideoList = require('../api/video')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/vids',function (req, res,next) {
  getVideoList(req.query.page,req.query.vid).then(vidList => {
    res.json({
      status : 1,
      vidList: vidList
    });
  }, reject => {
    res.json({
      status : 0
    })
  })
})

module.exports = router;
