let express = require('express');
let cors = require('cors')
let app = express();

let services = require('./routes/services')

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors())

// app.use(express.static('public'))

app.use('/services', services);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
