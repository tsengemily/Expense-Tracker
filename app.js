const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

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

app.use(methodOverride('_method'))

app.use(routes)

app.listen(PORT, () => {
  console.log(`The server is listening on http://localhost:${PORT}`)
})
