// -*- coding: utf-8 -*-
var fs = require('fs');
var http = require('http');
var express = require('../node_modules/express/lib/express.js');

var app = express();
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);

var BinaryServer = require('../node_modules/binaryjs/lib/server.js').BinaryServer;
var bs = BinaryServer({server: server});

bs.on('connection', function(client){
    client.on('stream', function (stream, meta){
        console.log('open');
        for (var id in bs.clients){
            console.log(id);
            if (bs.clients.hasOwnProperty(id)){
                console.log('hit');
                var otherClient = bs.clients[id];
                if(otherClient != client){
                    console.log('target');
                    var send = otherClient.createStream(meta);
                    stream.pipe(send);
                }
            }
        }

    });
});

server.listen(9000);
console.log('start...');
