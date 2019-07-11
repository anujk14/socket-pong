# socket-pong
This contains a sample project consisting of a Node.js server and a client, which connect via websockets. The server sends "PING" messages to the client over the socket and the client is expected to respond with "PONG" messages to the server to keep the connection alive.

## Requirements
[Node.js](https://nodejs.org/en/)
[npm](https://www.npmjs.com/)

## Directory structure

### Server
This directory contains code for the server. It consists of two main files, `app.js` and `src/WebSocketServer.js`
1. `app.js` is the entry point to the server which consists of an HTTPServer and also initiates a websocket server
2. `src/WebSocketServer` is the class that instantiates the websocket server object. It uses the [ws](https://github.com/websockets/ws) package to implement the server. This class basically acts as a wrapper around the `ws` library, so that the library can be easily changed in the future without affecting the rest of the code

### Client
This directory contains code for the client. It consists of two main files `app.js` and `index.html`
1. `app.js` is the entry point to the client server which is used to render the main HTML page
2. `index.html` is a file, which displays pings being received from the server, via websockets. It also contains a "Stop ponging" button to allow the client to stop ponging the server, which would ultimately result in the client's socket connection getting terminated in 5 seconds.

NOTE: The client can be run by directly opening the `index.html` file in the browser. A server was created for the same just for demonstration purposes, to show a more scalable scenario where a full fledged app is used to create such socket connections

## How to run

We will require two terminal windows to run this. Please follow the following steps from the root folder of the repository:

### Terminal 1
```
cd server
npm install
node ./app.js
```

### Terminal 2
```
cd client
node ./app.js
```

There are logs generated on the server terminal window which help with seeing the status of various connections

## API to see list of clients

Once the server has started, a list of the connected clients can be retrieved by calling `http://localhost:8000/` with a `GET` request. The format of the response is as follows:
```
URL: http://localhost:8000/
METHOD: GET
RESPONSE:
{ "ids" : [ id1<String>, id2<String>, ... ]"
```
