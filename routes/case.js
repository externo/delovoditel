module.exports = function (app, mongo, db) {

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
          status: req.body.status,
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

  app.put('/admin/case/:id/files', function (req, res) {
    var caseId = new mongo.ObjectID(req.params.id);
    db.collection('cases').updateOne(
      {"_id": caseId},
      {
        $set: {
          "files": req.body
        }
      }
    );
  });

  app.put('/admin/case/:id/datetime', function (req, res) {
    var caseId = new mongo.ObjectID(req.params.id);
    db.collection('cases').updateOne(
      {"_id": caseId},
      {
        $set: {
          "info.datetime": req.body.datetime
        }
      }
    );
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

};