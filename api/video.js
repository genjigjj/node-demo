const cheerio = require('cheerio')
const request = require('superagent')
const proxy = require('superagent-proxy')

// 获取相关视频id列表
function getVideoList (pageNo, vid) {
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
        if (res.text !== undefined && res.text !== "") {
          res.text.replace(/[\n]/g, '')
          const videos = JSON.parse(res.text).videos
          const $ = cheerio.load(videos)
          /* $('img').each(function(i, elem){
             let id = $(this).attr('id')
             const videoId = id.split('_')[1]
             console.log(videoId)
           }) */
          const vidList = []
          $('a').each(function (i, elem) {
            const href = $(this).attr('href')
            const videoId = href.split('/')[4]
            vidList.push(videoId)
          })
          if (vidList.length > 0) {
            resolve(vidList)
          } else {
            reject()
          }
        }else {
          reject()
        }
      })
      .catch(err => {
        console.log(err)
      })
  })

}

module.exports = getVideoList