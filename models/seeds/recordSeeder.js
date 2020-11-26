const db = require('../../config/mongoose')
const Record = require('../record')
const records = require('./record.json')

db.once('open', () => {
  Record.create(records.result)
  console.log('done')
})
