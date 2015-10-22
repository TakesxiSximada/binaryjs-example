// -*- coding: utf-8 -*-

var client = new BinaryClient('ws://localhost:9000');
client.on('stream', function (stream, meta){
    var parts = [];
    stream.on('data', function (data){
        parts.push(data);
    });
    stream.on('end', function (data){
        var img = document.createElement('img');
        img.src = (window.URL || window.webkitURL)
            .createObjectURL(new Blob(parts));
        document.body.appendChild(img);
    });
});
