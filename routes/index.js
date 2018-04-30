const express = require('express')
const router = express.Router()
const getVideoList = require('../api/video')

router.get('/vids', function(req, res, next) {
  getVideoList(req.query.page, req.query.vid)
    .then(resolve => {
      res.json({
        status: 1,
        vidList: resolve
      })
    }, reject => {
      res.json({
        status: 0
      })
    })
})

module.exports = router
