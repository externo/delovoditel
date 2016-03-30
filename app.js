var ip = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var Grid = require('gridfs-stream');
var app = express();

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var db;
var gfs;
var mongoUrl = process.env.OPENSHIFT_MONGODB_DB_URL;
var connectionUrl = mongoUrl || 'mongodb://localhost/test';

// Initialize connection once
MongoClient.connect(connectionUrl, function(err, database) {
  if(err) throw err;

  db = database;
  gfs = Grid(db, mongo);
});

app.get('/admin/case', function (req, res) {
  db.collection('cases').find()
    .toArray(function (err, cases) {
      res.json(cases);
    }
  )
});

app.post('/admin/case', function (req, res) {
  db.collection('cases').insertOne(
    req.body,
    function (err, result) {
      db.collection('cases').find()
        .toArray(function (err, cases) {
          res.json(cases);
        }
      );
    });
});

app.get('/admin/case/:id', function (req, res) {
  var caseId = new mongo.ObjectID(req.params.id);
  console.log(req.params.id);
  db.collection('cases').findOne({_id: caseId}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/admin/case/:id', function (req, res) {
  var caseId = new mongo.ObjectID(req.params.id);
  db.collection('cases').update(
    {_id: req.params.id},
    {
      $set: {
        "number": req.body.number,
        "court": req.body.court,
        "instance": req.body.instance,
        "type": req.body.type,
        "client.name": req.body.client.name,
        "client.phone": req.body.client.phone,
        "files": req.body.files
      },
      $currentDate: {"lastModified": true}
    },
    function (err, results) {
      db.collection('cases').find()
        .toArray(function (err, cases) {
          res.json(cases);
        }
      );
    });
});

app.delete('/admin/case/:id', function (req, res) {
  var caseId = new mongo.ObjectID(req.params.id);
  db.collection('cases').deleteOne(
    {_id: caseId},
    function (err, results) {
      db.collection('cases').find()
        .toArray(function (err, cases) {
          res.json(cases);
        }
      );
    }
  );
});

app.get('/admin/case/:id/file', function (req, res) {
  gfs.files.find()
    .map(function (doc) {
      return {
        id: doc._id,
        name: doc.filename
      };
    })
    .toArray(function (err, files) {
      res.send(files);
    });
});

app.get('/file/:id', function (req, res) {
  gfs.findOne({_id: req.params.id}, function (err, file) {
    if (err) return res.status(400).send(err);
    if (!file) return res.status(404).send('');

    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

    var readstream = gfs.createReadStream({
      _id: file._id
    });

    readstream.on("error", function (err) {
      console.log("Got error while processing stream " + err.message);
      res.end();
    });

    readstream.pipe(res);
  });
});

app.post('/file', function (req, res) {
  var filename = req.headers.filename;
  var writeStream = gfs.createWriteStream({
    filename: filename
  });

  writeStream.on('finish', function () {
    res.send(writeStream.id);
  });

  req.pipe(writeStream);
});

app.delete('/file/:id', function (req, res) {
  gfs.remove({_id: req.params.id}, function (err, file) {
    if (err) return res.status(400).send(err);
    if (!file) return res.status(404).send('');

    res.send(req.params.id);
  });
});

app.listen(port, ip);