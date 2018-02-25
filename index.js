const path = require('path');
const express = require('express');
const cors = require('express-cors');
var bodyParser = require('body-parser');
const dotenv = require('dotenv').config()
const port = (process.env.PORT || 3001);
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('app'));


app.get('/', function (req, res) { res.sendFile(path.join(__dirname, '/index.html')) });
app.post('/send-form', function(req, res) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.send(req.body)
})
app.listen(port);

console.log(`Listening at http://localhost:${port}`);
