const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})
