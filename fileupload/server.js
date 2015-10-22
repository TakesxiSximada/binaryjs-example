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
        var file = fs.createWriteStream(__dirname + '/public/' + meta.name);
        stream.pipe(file);

        stream.on('data', function (data){
            console.log('uploading..');
            stream.write({rx: data.length / meta.size});
        });
    });
});

server.listen(9000);
console.log('start...');
