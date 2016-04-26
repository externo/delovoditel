module.exports = function (app, mongo, db) {

  // Archive cases
  app.get('/admin/archive', function (req, res) {
    db.collection('cases').find({status: 'won'})
      .toArray(function (err, cases) {
        res.json(cases);
      }
    );
  });

  app.get('/admin/archive/:id', function (req, res) {
    var caseId = new mongo.ObjectID(req.params.id);
    db.collection('cases').findOne({_id: caseId}, function (err, doc) {
      res.json(doc);
    });
  });

  app.put('/admin/archive/:id/extract', function (req, res) {
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

  app.delete('/admin/archive/:id', function (req, res) {
    var caseId = new mongo.ObjectID(req.params.id);
    db.collection('cases').deleteOne(
      {_id: caseId},
      function (err, results) {
        db.collection('cases').find({status: 'won'})
          .toArray(function (err, cases) {
            res.json(cases);
          }
        );
      }
    );
  });

};