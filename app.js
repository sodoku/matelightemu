var PORT = 1337;
var HOST = '127.0.0.1';
var ROWS = 16;
var COLS = 40;

var ansi = require('ansi')
  , cursor = ansi(process.stdout);
var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    //var checksum = message.slice(0,4);
    var picbuffer = message.slice(4);
    cursor.write('\033[2J');
    for (var i = 0; i < picbuffer.length; i+=3){
      if (i % COLS == 0) cursor.reset().write('\n');
      var pixelbuffer = message.slice(i, i+3);
      cursor.rgb(0,0,0).bg.rgb(pixelbuffer[0],pixelbuffer[1],pixelbuffer[2]).write("X");
    }
    cursor.reset();

    //console.log(pic);

});

server.bind(PORT, HOST);
