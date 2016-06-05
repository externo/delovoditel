module.exports = function (app, mongo, db) {

  // Users
  app.get('/admin/user', function (req, res) {
    db.collection('users').find()
      .toArray(function (err, users) {
        res.json(users);
      }
    );
  });

  app.get('/admin/user/:id', function (req, res) {
    var userId = new mongo.ObjectID(req.params.id);
    db.collection('users').findOne({_id: userId}, function (err, doc) {
      res.json(doc);
    });
  });

  app.post('/admin/user', function (req, res) {
    db.collection('users').insertOne(req.body);
    res.end();
  });

  app.put('/admin/user/:id', function (req, res) {
    var profileId = new mongo.ObjectID(req.params.id);
    db.collection('users').updateOne(
      {"_id": profileId},
      {
        $set: {
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          address: req.body.address
        }
      },
      function (err, doc) {
        var userId = new mongo.ObjectID(req.params.id);
        db.collection('users').findOne({_id: userId}, function (err, doc) {
          res.json(doc);
        });
      });
  });

};