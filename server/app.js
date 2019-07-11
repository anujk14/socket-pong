var http = require('http');
var WebSocketServer = require('./src/WebSocketServer');

var HTTPServer = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});

  clientInfo = JSON.stringify({ "ids": wss.getClients() })

  res.write(clientInfo);
  res.end();
}).listen(8000, function() {
  console.log("Running on port 8000........");
});

var wss = new WebSocketServer(HTTPServer);
