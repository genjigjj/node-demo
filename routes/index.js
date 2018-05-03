const express = require('express')
const router = express.Router()
const getVideoList = require('../api/video')

router.get('/vids', function(req, res, next) {
  getVideoList(req.query.page, req.query.vid)
    .then(resolve => {
      res.header('Access-Control-Allow-Origin', '*')
      res.json({
        status: 1,
        videosList: resolve
      })
    }, reject => {
      res.header('Access-Control-Allow-Origin', '*')
      res.json({
        status: 0
      })
    })
})

module.exports = router
