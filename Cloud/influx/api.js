import {InfluxDB, Point} from '@influxdata/influxdb-client'
import redis,{createClient} from 'redis';
import {hostname} from 'node:os'

/* CLOUD */
const CloudToken = "THISISMYTOKENAPI"
const CloudUrl = 'http://influxdb:8086'
let CloudOrg = `TimArchy`
let CloudBucket = `DATA`
const CLOUD_WEB_SOCKET_PORT = 3000;
const CloudServer = new WebSocketServer({ port : WEB_SOCKET_PORT });
const CloudClient = new InfluxDB({CloudUrl, CloudToken}).getQueryApi(CloudOrg)

/* LOCAL */
const LocalUrl = 'redis://redis'
const LocalPort = 6379
const LocalClient = redis.createClient({
  url: LocalUrl,
  port: LocalPort
});

/* HTTP Calls */
const Http = new XMLHttpRequest();

Http.open("GET", GetAll());

function GetAll() {
  
  /* Cloud */
  const fluxQuery = 'from(bucket:' +  CloudBucket + ')';
  const observer = {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row)
      // console.log(
      //   `${o._value} ${o._measurement} in '${o.location}' (${o.sensor_id}): ${o._field}=${o._value}`
      // )
    }
  }
  CloudClient.queryRows(fluxQuery, observer)
}

// Http.onreadystatechange = (e) => {
//   console.log(Http.responseText)
// }

// Http.send();
  
// function create()  {
//     let writeClient = client.getWriteApi(org, bucket)
//     writeClient.useDefaultTags({location: hostname()})
//     let msg = JSON.parse(data)
// }

function get() {}


function update() {}

function remove() {}