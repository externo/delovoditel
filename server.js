var ip = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var busboy = require('busboy');
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var Grid = require('gridfs-stream');
var app = express();

var fs = require('fs');
var http = require('http');
var httpServer = http.createServer(app);

//app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://delovoditel.gq");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Key, filename, Metadata, header");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function redirectSec(req, res, next) {
  if (req.headers['x-forwarded-proto'] == 'http') {
    res.redirect('https://' + req.headers.host + req.path);
  } else {
    return next();
  }
}

var mongoUrl = process.env.OPENSHIFT_MONGODB_DB_URL;
var connectionUrl = mongoUrl || 'mongodb://localhost/test';

// Initialize connection once
MongoClient.connect(connectionUrl, function (err, database) {

  if (err) throw err; // TODO: listen for drop

  var db = database;
  var gfs = Grid(db, mongo);

  // routes
  require('./routes/case')(app, mongo, db);
  require('./routes/archive')(app, mongo, db);
  require('./routes/court')(app, mongo, db);
  require('./routes/fileType')(app, mongo, db);
  require('./routes/file')(app, mongo, gfs, busboy);
  require('./routes/history')(app, db);

});

// Process variables
app.get('/process', function (req, res) {
  res.json(process.env);
});

//Server
httpServer.listen(port, ip);
