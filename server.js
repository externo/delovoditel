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

var jwt = require('express-jwt');
var cors = require('cors');
app.use(cors());

var authCheck = jwt({
  secret: new Buffer('b9FK5q_1luMsQh3NExGd7Rk5bSBmBgKkiORIT2RgDzU4eIlJ1PVruI8eA0gVkw-Z', 'base64'),
  audience: 'wwcIqotTbjHGVVJ0Me1ZtrmB3NCRzII5'
});
app.use('/admin/case', authCheck);

//app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://delovoditel.gq");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept, Key, filename, Metadata, header");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
