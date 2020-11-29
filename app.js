const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
require('./config/mongoose')
const routes = require('./routes')

const app = express()
const port = 3000

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers: {
      ifEqual(category, targetCategory, options) {
        if (category === targetCategory) {
          return options.fn(this)
        }
        return options.inverse(this)
      },
    },
  })
)
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})
