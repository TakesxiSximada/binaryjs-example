// -*- coding: utf-8 -*-

var client = new BinaryClient('ws://localhost:9000');

client.on('stream', function (stream, meta){

    var parts = [];
    stream.on('data', function (data){
        parts.push(data);
    });

    stream.on('end', function (){
        console.log('end');
        var url = (window.URL || window.webkitURL)
            .createObjectURL(new Blob(parts));
        document.body.style.backgroundImage = 'url(' + url + ')';
    });

});

var fileinput = document.querySelector('#fileinput');
fileinput.addEventListener('change', function (event){
    var file = event.target.files[0];
    client.send(file);
}, false);
