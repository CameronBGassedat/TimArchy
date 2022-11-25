import WebSocket,{WebSocketServer} from 'ws';

const WEB_SOCKET_PORT = 3000;
const server = new WebSocketServer({ port : WEB_SOCKET_PORT });

const promClient = require('prom-client');

// const collectMetrics = promClient.collectDefaultMetrics();
// const Registry = promClient.Registry;
// const register = new Registry();
// collectMetrics({register});
// const gw = require('prom-pushgateway');

const gw = require('prom-pushgateway').createServer({
  port: 39110,
    readPromMetrics: () => promClient.register.metrics()
}, (err) => {
  // listening for /metrics requests
})



server.on('connection', function connection(ws) {
    ws.on('message', function message(event) {
        // CODE ICI
        console.log('received: %s', event.data);

        // Data push -> PushGateway -> pull Prometheus
        gw.gateway.ingestMetrics(
          // add custom metrics to the /metrics report
          event.data
        ), (err) => {
          // metrics will be part of the next /metrics report
        }
      });
    console.log("New connection established");

});



console.log("WebSocket server started at ws://locahost:"+ WEB_SOCKET_PORT);


