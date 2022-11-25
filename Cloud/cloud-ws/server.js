//import WebSocket,{WebSocketServer} from 'ws';

const WEB_SOCKET_PORT = 9090;
console.log("WebSocket server started at ws://locahost:"+ WEB_SOCKET_PORT);

const promClient = require('prom-client');
promClient.collectDefaultMetrics();

function createPushGateWay() {
  const options = {};
  const gw = require('prom-pushgateway').createServer(options, (err, info) => {
  })
  return gw;
}

testPushingMetrics();
function testPushingMetrics() {
  gw = createPushGateWay();
  
  const customMetrics =
  "fake-data 1\n" +
  "fake-data 2\n" +
  "fake-data 4\n";
  gw.gateway.ingestMetrics(customMetrics, (err) => {
    console.log("Log : gw.metrics");
    //callPromotheus();
  })

  console.log(promClient.register.metrics())
  console.log("Aftr print")
}

// const gw = require('prom-pushgateway').createServer({
//     readPromMetrics: () => promClient.register.metrics()
// }, (err, info) => {
//     // => { pid: 12345, port: 9091 }
// })

// server.on('connection', function connection(ws) {
//   ws.on('message', function message(event) {
//     console.log('received: %s', event.data);
//     gw = createPushGateWay();
//     gw.gateway.ingestMetrics(
//       event.data
//     ), (err) => {
//     }
//   });
//   console.log("New connection established");
// });

// // temporary checker 
// async function callPromotheus()
// {
//     let RequestClient = require("reqclient").RequestClient;

//     let GetGlobalDataPrometeus = new RequestClient({
//         baseUrl: "http://localhost:9090/api/v1/",
//     });

//     const GetGlobalDataPrometeus = require('../utils/***/prometeus');

//     GetGlobalDataPrometeus.get(`/query?query=${query}`)
//         .then(response => {
//             console.log("Value Prometheus: "+response.data);
//             resolve(response);
//         })
//         .catch(err => {
//             reject(err)
//         })
// }