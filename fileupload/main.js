// -*- coding: utf-8 -*-

var client = new BinaryClient('ws://localhost:9000');

function doNothing(e){
    e.preventDefault();
    e.stopPropagation();
}


client.on('open', function (){
    var box = document.querySelector('#box');
    console.log('open');
    box.addEventListener('dragenter', doNothing);
    box.addEventListener('dragover', doNothing);
    box.addEventListener('dragend', doNothing);
    box.addEventListener('drop', function (e){
        console.log('uploading...');
        var file = e.dataTransfer.files[0];
        doNothing(e);
        var stream = client.send(file, {
            name: file.name,
            size: file.size,
        });
        var tx = 0;
        stream.on('data', function (data){
            console.log(Math.round(tx+=data.rx*100) + '% done');
        });
    });
});

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
