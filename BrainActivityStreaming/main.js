var osc = require("osc");
var path = require('path');


var express = require('express');
var app = express();
app.use(express.static(__dirname));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

var server = app.listen(3000, function(err) {
  if (err) {
    console.log(err);
  } else {
    var port = 3000;
    console.log(`Server listening on port: ${port}`);
  }
});
var io = require('socket.io')(server);



io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('connection message', "you have now connected to the server");
});

// Create an osc.js UDP Port listening on port 5000.
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 5000
});

// Listen for incoming OSC bundles.
udpPort.on("message", function (oscMessage, timeTag, info) {
    //console.log("An OSC message just arrived for time tag", timeTag, ":", oscMessage);
    //console.log("Remote info is: ", info);
    var data = {};

    //send eeg data to socket
    if (oscMessage.address == "/muse/eeg") {
      io.emit('eeg activity', oscMessage.args[0]);
    }

    if (oscMessage.address == "/muse/elements/experimental/mellow") {
      io.emit('mellow activity', oscMessage.args[0]);
    }

    if (oscMessage.address == "/muse/elements/experimental/concentration") {
      io.emit('concentration activity', oscMessage.args[0]);
    }

    if (oscMessage.address == "/muse/elements/jaw_clench") {
      io.emit('jaw clench activity', oscMessage.args[0]);
    }
});

// Open the socket.
udpPort.open();

// When the port is read, send an OSC message to, say, SuperCollider
udpPort.on("ready", function () {
    console.log("Ready")
});
