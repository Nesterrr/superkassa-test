const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('change', function(msg) {
        io.emit('change-all', msg);
    });
});

http.listen(8000, function() {
    console.log('listening on *:3000');
});

