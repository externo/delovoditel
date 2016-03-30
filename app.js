var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));


var ip = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var mongoUrl = process.env.OPENSHIFT_MONGODB_DB_URL;
var connectionUrl = mongoUrl || 'mongodb://localhost/test';

//mongoose.connect(connectionUrl);
MongoClient.connect(connectionUrl, function(err, db) {
  console.log("Connected correctly to server.");
  //db.close();
});

app.get('/process', function(req, res){
  res.json(process.env);
});
app.listen(port, ip);