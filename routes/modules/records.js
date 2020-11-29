const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const generateIcon = require('../../public/javascripts/generateIcon')

//進入新增頁
router.get('/new', (req, res) => {
  res.render('new')
})

//功能:新增
router.post('/', (req, res) => {
  const newrecord = req.body
  const name = newrecord.name
  const date = newrecord.date
  const category = newrecord.category
  const amount = newrecord.amount
  const icon = generateIcon(category)
  Record.create({
    name,
    date,
    category,
    amount,
    icon,
  })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
