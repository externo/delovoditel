module.exports = function (app, mongo, db) {

  // File types
  app.get('/admin/file/type', function (req, res) {
    db.collection('filetypes').find()
      .toArray(function (err, types) {
        res.json(types);
      }
    );
  });

  app.post('/admin/file/type', function (req, res) {
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

};