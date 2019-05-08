const {Router} = require('express')
const config = require('../config')
const router = Router()
const mongoose = require('mongoose')

const BuildingModel = require('../models/building_complex')

console.log(config)

mongoose.Promise = global.Promise
mongoose.connect(config.mongodb.url, {useNewUrlParser: true})
var db = mongoose.connection
db.on('error', console.error.bind(console, '数据库连接失败:'))
db.once('open', function() {
  console.log('数据库已连接')
})

router.get('/getMapPoint', async (req, res, next) => {
  try {
    let data = await BuildingModel.find({}).exec()
    for (let key in data) {
      let doc = data[key]
      if (doc['has_picture'] && doc['has_picture'].length > 0) {
        data[key]['has_picture'] = `${config.imageURL}${doc['has_picture'][0]}`
      } else {
        data[key]['has_picture'] = `/building-img-demo.jpg`
      }
    }
    return res.status(200).json({data: data})
  } catch (err) {
      console.log(err)
    return res.status(500).json({message: 'get data from db failed!'})
  }
})

module.exports = router