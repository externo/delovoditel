module.exports = function (app, db) {

  // History
  db.collection('history').find().sort({datetime: -1}).skip(20).forEach(x=>db.collection('history').deleteOne({_id: x._id}));

  app.get('/admin/history', function (req, res) {
    db.collection('history').find()
      .toArray(function (err, actions) {
        res.json(actions);
      }
    );
  });

  app.post('/admin/history', function (req, res) {
    req.body.datetime = new Date(req.body.datetime);
    db.collection('history').insertOne(req.body);
    res.end();
  });

};