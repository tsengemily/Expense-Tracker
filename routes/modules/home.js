const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const totalAmount = require('../../public/javascripts/totalAmount')

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then((records) => {
      const total = totalAmount(records)
      res.render('index', { records, total })
    })
    .catch((error) => console.log(error))
})

router.get('/filter/:category', (req, res) => {
  const category = req.params.category

  Record.find({ category })
    .lean()
    .sort({ date: 'desc' })
    .then((records) => {
      const total = totalAmount(records)
      const category = req.params.category
      res.render('index', { records, total, category })
    })
    .catch((error) => console.log(error))
})

module.exports = router
