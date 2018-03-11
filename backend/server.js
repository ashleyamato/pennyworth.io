let express = require('express')
let cors = require('cors')
let app = express()
let services = require('./routes/services')
let pennyworths = require('./routes/pennyworths')
let users_services = require('./routes/users_services')
let users = require('./routes/users')

let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors())

app.use('/services', services)
app.use('/pennyworths', pennyworths)
app.use('/users_services', users_services)
app.use('/users', users)

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

module.exports = app
