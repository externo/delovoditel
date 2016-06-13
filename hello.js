var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(8080, '37.247.116.78');
console.log('Server running at http://APP_PRIVATE_IP_ADDRESS:8080/'); 
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format; 
MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) 
{
    if (err) {
        throw err;
    } else {
        console.log("successfully connected to the database");
    }
    db.close();
});
