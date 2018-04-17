const express = require('express');
const app = express();
const path = require('path')
const http = require('http').Server(app);
const io = require('socket.io')(http);

let state = false;
const DELAY = 5000;
let lastCall = Date.now();

app.use(express.static(path.join(__dirname, '../build/')));

app.get('/*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('change', function(msg) {
        lastCall = msg;
        state = true;
        let ms = Date.now() - lastCall;

        socket.broadcast.emit('change-all', ms);
    });

    socket.on('get-state', function() {
        if (state === true) {
            let delta = Date.now() - lastCall;
            if (delta <= DELAY) {
                socket.emit('set-state', delta);
            } else {
                state = false;
            }
        }

    });
});

http.listen(8000, function() {
    console.log('listening on *:8000');
});

