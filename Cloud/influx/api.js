import {InfluxDB, Point} from '@influxdata/influxdb-client'
import {hostname} from 'node:os'

const token = "THISISMYTOKENAPI"
const url = 'http://influxdb:8086'
let org = `TimArchy`
let bucket = `DATA`

const WEB_SOCKET_PORT = 3000;
const server = new WebSocketServer({ port : WEB_SOCKET_PORT });
const client = new InfluxDB({url, token})

const Http = new XMLHttpRequest();
Http.open("GET", url);
Http.send();
Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
  }
  
function create()  {
    let writeClient = client.getWriteApi(org, bucket)
    writeClient.useDefaultTags({location: hostname()})
    let msg = JSON.parse(data)
}

function read() {}

function update() {}

function remove() {}