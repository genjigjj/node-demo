const express = require('express')
const router = express.Router()
const getData = require('../api/video')
const store = require('../api/store')

router.get('/vids', async function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  try {
    const videosList = await getData(req.query.page, req.query.vid)
    res.json({
      status: 1,
      videosList: videosList
    })
  } catch (err) {
    console.log(err)
    res.json({
      status: 0
    })
  }
})

// 添加喜欢的视频id
router.get('/add', async function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  let status = 0
  try {
    if (await store.setValue(req.query.vid) !== null) {
      status = 1
    }
  } catch (err) {
    console.log(err)
  }
  res.json({
    status: status
  })
})

// 去除喜欢的视频id
router.get('/delete', async function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  let status = 0
  try {
    if (await store.removeValue(req.query.vid) !== null) {
      status = 1
    }
  } catch (err) {
    console.log(err)
  }
  res.json({
    status: status
  })
})

// 获取指定区间视频id
router.get('/get', async function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  const body = {
    status: 0
  }
  try {
    const res = await store.getList(req.query.start, req.query.end)
    if (res !== null) {
      body.status = 1
      body.vidList = res.vidList
      body.total = res.total
    }
  } catch (err) {
    console.log(err)
  }
  res.json(body)
})

// 是否包含指定id
router.get('/contain', async function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  let status = 0
  try {
    const flag = await store.isContain(req.query.vid)
    if (flag !== null && flag) {
      status = 1
    }
  } catch (err) {
    console.log(err)
  }
  res.json({
    status: status
  })
})

module.exports = router
