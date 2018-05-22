const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const url = 'mongodb://root:root@45.78.42.182:27017/avgle?authMechanism=SCRAM-SHA-1'

mongoose
  .connect(url)
  .catch(err => console.log(err))
const Schema = mongoose.Schema
// 定义schema
const videoSchema = new Schema({
  userName: { type: String, index: true },
  vidList: Array
})
// 创建model
const Video = mongoose.model('video', videoSchema)

// 存视频id
async function setValue(vid) {
  const res = await Video.findOne({ userName: 'admin' })
  if (res === null || res === undefined) {
    const temp = new Video({
      userName: 'admin',
      vidList: [vid]
    })
    return temp.save()
  } else {
    res.vidList.push(parseInt(vid))
    return Video.updateOne({ userName: 'admin' }, { vidList: res.vidList })
  }
}

// 移除元素
async function removeValue(vid) {
  const res = await Video.findOne({ userName: 'admin' })
  if (res !== null && res !== undefined) {
    const index = res.vidList.indexOf(vid)
    res.vidList.splice(index, 1)
    return Video.updateOne({ userName: 'admin' }, { vidList: res.vidList })
  } else {
    return Promise.reject('remove fail')
  }
}
// 获取指定区间的值
async function getList(start, end) {
  const res = await Video.findOne({ userName: 'admin' })
  if (res !== null && res !== undefined) {
    return {
      vidList: res.vidList.slice(start, end),
      total: res.vidList.length
    }
  } else {
    return null
  }
}
// 判断是否存在某值
async function isContain(vid) {
  const res = await Video.findOne({ userName: 'admin' })
  if (res !== null && res !== undefined) {
    return res.vidList.includes(vid)
  } else {
    return null
  }
}
module.exports = { setValue, removeValue, getList, isContain }

