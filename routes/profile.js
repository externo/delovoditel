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
    db.collection('users').insertOne( req.body);
    res.end();
  });

  app.put('/admin/user/:id', function (req, res) {
    var articleId = new mongo.ObjectID(req.params.id);
    db.collection('users').updateOne(
      {"_id": articleId},
      {
        $set: {
          name: req.body.name,
          address: req.body.address,
          image: req.body.image,
          phone: req.body.phone,
          email: req.body.email,
          presentation: req.body.presentation
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