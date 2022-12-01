import WebSocket,{WebSocketServer} from 'ws';

import {InfluxDB, Point} from '@influxdata/influxdb-client'
import {hostname} from 'node:os'

const token = "THISISMYTOKENAPI"
const url = 'http://influxdb:8086'
let org = `TimArchy`
let bucket = `DATA`


const client = new InfluxDB({url, token})
//let socket = new WebSocket("ws://127.0.0.1:3000")
const WEB_SOCKET_PORT = 3000;

const server = new WebSocketServer({ port : WEB_SOCKET_PORT });


server.on('connection', function connection(ws) {
    ws.on('message', function message( data) {
      console.log('received: %s', data);

      let writeClient = client.getWriteApi(org, bucket)
      writeClient.useDefaultTags({location: hostname()})
      //let msg = data.toString().replace('/','')
      let msg = JSON.parse(data)
      console.log(msg)

      let point = new Point('lumière')
        .tag('light_id', 'light kitchen')
        .stringField('value','test')

      writeClient.writePoint(point)
      console.log(point)
      // flush pending writes and close writeApi
      writeClient
        .close()
        .then(() => {
          console.log('CLOSE FINISHED')
        })
        .catch(e => {
          console.log('CLOSE FAILED', e)
        })

      });
    console.log("New connection established");

});


console.log("WebSocket server started at ws://locahost:"+ WEB_SOCKET_PORT);


