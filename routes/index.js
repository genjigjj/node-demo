const express = require('express')
const router = express.Router()
const getData = require('../api/video')

router.get('/vids', async function(req, res, next) {
  try {
    const videosList = await getData(req.query.page, req.query.vid)
    res.header('Access-Control-Allow-Origin', '*')
    res.json({
      status: 1,
      videosList: videosList
    })
  } catch (err) {
    console.log(err)
    res.header('Access-Control-Allow-Origin', '*')
    res.json({
      status: 0
    })
  }
})

module.exports = router
