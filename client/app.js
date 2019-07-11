const http = require('http');
const fs = require('fs');

const HTTPServer = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('./index.html', null, function(error ,data) {
    if(error) {
      res.writeHead(404);
      res.write("Oops! Something went wrong");
    } else{
      res.write(data);
    }
    res.end();
  });
}).listen(5000, function() {
  console.log("Running on port 5000........");
});
