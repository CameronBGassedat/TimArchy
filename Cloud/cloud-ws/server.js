import WebSocket,{WebSocketServer} from 'ws';



//let socket = new WebSocket("ws://127.0.0.1:3000")
const WEB_SOCKET_PORT = 3000;

const server = new WebSocketServer({ port : WEB_SOCKET_PORT });


server.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log('received: %s', data);
      });
    console.log("New connection established");

});


console.log("WebSocket server started at ws://locahost:"+ WEB_SOCKET_PORT);


