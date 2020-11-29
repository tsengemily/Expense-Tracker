const express = require('express')
const db = require('../../config/mongoose')
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

//進入編輯業面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch((error) => console.log(error))
})

//功能:修改
router.post('/:id/edit', (req, res) => {
  const id = req.params.id
  const newrecord = req.body
  const name = newrecord.name
  const date = newrecord.date
  const category = newrecord.category
  const amount = newrecord.amount
  const icon = generateIcon(category)
  return Record.findById(id)
    .then((record) => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.icon = icon
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

//功能:刪除
router.post('/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
