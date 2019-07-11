var http = require('http');

var HTTPServer = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write("Hello");
  res.end();
}).listen(8000, function() {
  console.log("Running on port 8000........");
});
