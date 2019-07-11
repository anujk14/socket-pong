const WebSocket = require('ws');

class WebSocketServer {
  constructor(httpServer, pingInterval=500, maxMissedHeartbeats=10) {
    this.wss = new WebSocket.Server({
      server: httpServer,
      clientTracking: true
    });
    this.wss.maxMissedHeartbeats = maxMissedHeartbeats;
    this.wss.on('connection', this._onConnection.bind(this));
    setInterval(function() {
      this._ping.bind(this);
      this._ping();
    }.bind(this), pingInterval);
  }

  getClients() {
    const clients = []
    this.wss.clients.forEach(function (client){
      clients.push(client.id);
    });
    return clients;
  }

  // Region: Private methods

  _onConnection(socket) {
    socket.id = this._getUniqueID();
    socket.notReceivedPong = 0;

    console.log(`${socket.id} connected successfully`)

    socket.on('message', function incoming(message) {
      if(message.toUpperCase() == "PONG") {
        socket.notReceivedPong = 0;
      }
    });

    socket.on('close', function close() {
      console.log(`Closing connection to client ${socket.id}`)
    })
  }

  _getUniqueID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
  }

  _ping() {
    this.wss.clients.forEach(function each(socket){
      if(socket.notReceivedPong == this.wss.maxMissedHeartbeats) {
          console.log(`Disconnecting client ${socket.id} as it has't responded with a pong since ${this.wss.maxMissedHeartbeats} heartbeats`);
          socket.terminate();
      } else {
          socket.send("PING");
          socket.notReceivedPong += 1;
      }
    }.bind(this));
  }
}

module.exports = WebSocketServer;
