const client = require('redis').createClient({
  host: '45.78.42.182',
  port: '6379'
})
const { promisify } = require('util')
// 同步插入
const getAsync = promisify(client.get).bind(client)
// 同步移除列表元素
const setAsync = promisify(client.set).bind(client)
// 键
const KEY = 'videoList'

client.on('error', function(err) {
  console.log('Error ' + err)
})

// 存视频id
async function setValue(vid) {
  let vidList = JSON.parse(await getAsync(KEY))
  if (vidList === null) {
    vidList = []
  }
  vidList.push(vid)
  const res = await setAsync(KEY, JSON.stringify(vidList))
  console.log(res)
}

// 移除元素
async function removeValue(vid) {
  const vidList = JSON.parse(await getAsync(KEY))
  if (vidList !== null) {
    const index = vidList.indexOf(vid)
    vidList.splice(index, 1)
    await setAsync(KEY, JSON.stringify(vidList))
  } else {
    return null
  }
}

// 获取指定区间的值
async function getList(start, end) {
  const vidList = JSON.parse(await getAsync(KEY))
  if (vidList !== null) {
    return {
      vidList: vidList.slice(start, end),
      total: vidList.length
    }
  } else {
    return null
  }
}

// 判断是否存在某值
async function isContain(vid) {
  const vidList = JSON.parse(await getAsync(KEY))
  if (vidList !== null) {
    return vidList.includes(vid)
  } else {
    return null
  }
}

module.exports = { setValue, removeValue, getList, isContain }
