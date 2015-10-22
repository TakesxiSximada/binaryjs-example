// -*- coding: utf-8 -*-
var fs = require('fs');
var BinaryServer = require('../node_modules/binaryjs/lib/server.js').BinaryServer;

var server = BinaryServer({
    port: 9000,
});

server.on('connection', function (client){
    var img = fs.createReadStream(__dirname + '/flower.png');
    client.send(img);
});
