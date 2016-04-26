module.exports = function (app, mongo, gfs, busboy) {

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
    var bus = new busboy({headers: req.headers});
    var fileId = new mongo.ObjectId();

    bus.on('file', function (fieldname, file, filename, encoding, mimetype) {
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
    req.pipe(bus);
  });

  app.delete('/admin/file/:id', function (req, res) {
    gfs.remove({_id: req.params.id}, function (err, file) {
      if (err) return res.status(400).send(err);
      if (!file) return res.status(404).send('');

      res.send(req.params.id);
    });
  });

};