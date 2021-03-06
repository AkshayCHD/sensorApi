#!/usr/bin/env node


const constants = require('../projectConstants.js')

const constants = require('../projec')
var WebSocketClient = require('websocket').client;
 
var client = new WebSocketClient();
 
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
    connection.sendUTF(JSON.stringify({
        device: 2,
        sensor: "Vibration",
        status: 0
    }));
    connection.close();
});
 
client.connect(constants.MCB_BOARD_IP);