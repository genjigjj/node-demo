const cheerio = require('cheerio')
const request = require('superagent')
const proxy = require('superagent-proxy')

// 获取相关视频id列表
function getVideoList(pageNo, vid) {
  const url = 'https://avgle.com/include/ajax/related_videos.php'
  const proxy_uri = 'http://127.0.0.1:1519'
  proxy(request)
  return new Promise((resolve, reject) => {
    request
      .post(url).proxy(proxy_uri)
      .type('form')
      .set('Accept', 'application/json')
      .send({
        video_id: vid,
        page: pageNo,
        move: 'next'
      })
      .then(res => {
        if (res.text !== undefined && res.text !== '') {
          res.text.replace(/[\n]/g, '')
          const videos = JSON.parse(res.text).videos
          const $ = cheerio.load(videos)
          /* $('img').each(function(i, elem){
             let id = $(this).attr('id')
             const videoId = id.split('_')[1]
             console.log(videoId)
           }) */
          const vidList = []
          $('a').each(function(i, elem) {
            const href = $(this).attr('href')
            const videoId = href.split('/')[4]
            vidList.push(videoId)
          })
          if (vidList.length > 0) {
            getVideoInfo(vidList)
              .then(videosList => {
                resolve(videosList)
              })
          } else {
            reject()
          }
        } else {
          reject()
        }
      })
      .catch(err => {
        console.log(err)
      })
  })
}

// 获取视频列表
function getVideoInfo(vidList) {
  const url = 'https://api.avgle.com/v1/video/'
  const proxy_uri = 'http://127.0.0.1:1519'
  return new Promise((resolve, reject) => {
    const requestList = []
    for (const id of vidList) {
      proxy(request)
      requestList.push(
        request
          .get(url + id)
          .proxy(proxy_uri)
          .set('Accept', 'application/json')
      )
    }
    Promise.all(requestList)
      .then((resArray) => {
        if (resArray.length === 0 || resArray === undefined) {
          reject()
        } else {
          const videosList = []
          for (const res of resArray) {
            videosList.push(res.body)
          }
          resolve(videosList)
        }
      })
  })
}

module.exports = getVideoList
