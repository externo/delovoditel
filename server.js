var ip = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var Busboy = require('busboy');
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var Grid = require('gridfs-stream');
var app = express();
//require('./controllers/case');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var db;
var gfs;
var mongoUrl = process.env.OPENSHIFT_MONGODB_DB_URL;
var connectionUrl = mongoUrl || 'mongodb://localhost/test';

// Initialize connection once
MongoClient.connect(connectionUrl, function (err, database) {
  if (err) throw err;

  db = database;
  gfs = Grid(db, mongo);
});

// Process variables
app.get('/process', function (req, res) {
  res.json(process.env);
});

// Pending cases
app.get('/admin/case', function (req, res) {
  db.collection('cases').find({status: 'pending'})
    .toArray(function (err, cases) {
      res.json(cases);
    }
  );
});

app.post('/admin/case', function (req, res) {
  var newCase = req.body;
  //newCase.info.datetime = new Date(req.body.info.datetime);
  db.collection('cases').insertOne(
    newCase,
    function (err, result) {
      db.collection('cases').find({status: 'pending'})
        .toArray(function (err, cases) {
          res.json(cases);
        }
      );
    });
});

app.get('/admin/case/:id', function (req, res) {
  var caseId = new mongo.ObjectID(req.params.id);
  db.collection('cases').findOne({_id: caseId}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/admin/case/:id', function (req, res) {
  var caseId = new mongo.ObjectID(req.params.id);
  db.collection('cases').updateOne(
    {"_id": caseId},
    {
      $set: {
        info: {
          type: req.body.info.type,
          number: req.body.info.number,
          instance: req.body.info.instance,
          court: req.body.info.court,
          note: req.body.info.note,
          datetime: req.body.info.datetime
        },
        client: {
          name: req.body.client.name,
          number: req.body.client.number,
          email: req.body.client.email,
          phone: req.body.client.phone,
          fax: req.body.client.fax,
          address: req.body.client.address
        },
        files: req.body.files
      }
    },
    function (err, results) {
      db.collection('cases').find({status: 'pending'})
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
      db.collection('cases').find({status: 'pending'})
        .toArray(function (err, cases) {
          res.json(cases);
        }
      );
    }
  );
});

app.put('/admin/case/:id/archive', function (req, res) {
  var caseId = new mongo.ObjectID(req.params.id);
  db.collection('cases').updateOne(
    {"_id": caseId},
    {
      $set: {
        status: 'won'
      }
    },
    function (err, results) {
      db.collection('cases').find({status: 'pending'})
        .toArray(function (err, cases) {
          res.json(cases);
        }
      );
    });
});

// Archive cases
app.get('/admin/archive/case', function (req, res) {
  db.collection('cases').find({status: 'won'})
    .toArray(function (err, cases) {
      res.json(cases);
    }
  );
});

app.put('/admin/case/:id/extract', function (req, res) {
  var caseId = new mongo.ObjectID(req.params.id);
  db.collection('cases').updateOne(
    {"_id": caseId},
    {
      $set: {
        status: 'pending'
      }
    },
    function (err, results) {
      db.collection('cases').find({status: 'won'})
        .toArray(function (err, cases) {
          res.json(cases);
        }
      );
    });
});

// Courts
app.get('/admin/court', function (req, res) {
  db.collection('courts').find()
    .toArray(function (err, types) {
      res.json(types);
    }
  );
});

app.post('/admin/court', function (req, res) {
  console.log(req.body);
  db.collection('courts').insertOne(
    req.body,
    function (err, result) {
      db.collection('courts').find()
        .toArray(function (err, types) {
          res.json(types);
        }
      );
    });
});

app.delete('/admin/court/:id', function (req, res) {
  var typeId = new mongo.ObjectID(req.params.id);
  db.collection('courts').deleteOne(
    {_id: typeId},
    function (err, results) {
      db.collection('courts').find()
        .toArray(function (err, types) {
          res.json(types);
        }
      );
    }
  );
});

// File types
app.get('/admin/file/type', function (req, res) {
  db.collection('filetypes').find()
    .toArray(function (err, types) {
      res.json(types);
    }
  );
});

app.post('/admin/file/type', function (req, res) {
  console.log(req.body);
  db.collection('filetypes').insertOne(
    req.body,
    function (err, result) {
      db.collection('filetypes').find()
        .toArray(function (err, types) {
          res.json(types);
        }
      );
    });
});

app.delete('/admin/file/type/:id', function (req, res) {
  var typeId = new mongo.ObjectID(req.params.id);
  db.collection('filetypes').deleteOne(
    {_id: typeId},
    function (err, results) {
      db.collection('filetypes').find()
        .toArray(function (err, types) {
          res.json(types);
        }
      );
    }
  );
});

// File
app.get('/admin/file', function (req, res) {
  gfs.files.find()
    .toArray(function (err, files) {
      res.send(files);
    });
});

app.get('/admin/file/:id', function (req, res) {
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

app.post('/admin/file', function (req, res) {
  var busboy = new Busboy({headers: req.headers});
  var fileId = new mongo.ObjectId();

  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    var writeStream = gfs.createWriteStream({
      _id: fileId,
      filename: decodeURIComponent(filename),
      mode: 'w',
      content_type: mimetype,
      metadata: JSON.parse(decodeURIComponent(req.headers.metadata))
    });
    file.pipe(writeStream);
  })
    .on('finish', function () {
      res.writeHead(200, {'content-type': 'text/html'});
      res.end(fileId.toString());
    });
  req.pipe(busboy);
});

app.delete('/admin/file/:id', function (req, res) {
  gfs.remove({_id: req.params.id}, function (err, file) {
    if (err) return res.status(400).send(err);
    if (!file) return res.status(404).send('');

    res.send(req.params.id);
  });
});

//Server
app.listen(port, ip);
