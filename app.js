const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const routes = require('./routes');

const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

// MAKE SURE TO CHANGE THIS
const mongoUrl = 'mongodb://<username>:<password>@ds023674.mlab.com:23674/<database name>';

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('views'));

app.use(function(req, res, next) {
  // you might want to change this
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Listening on port ${port}`);
  MongoClient.connect(mongoUrl, (err, db) => {
    if (err) {
      console.log(err);
    } else {
      app.use(routes(db));    
    }
  });
});