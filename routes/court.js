module.exports = function (app, mongo, db) {

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

};