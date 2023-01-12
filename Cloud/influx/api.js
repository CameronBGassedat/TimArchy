import {InfluxDB, Point} from '@influxdata/influxdb-client'
import redis,{createClient} from 'redis';
import {hostname} from 'node:os'

/* CLOUD */
const CloudToken = "THISISMYTOKENAPI"
const CloudUrl = 'http://influxdb:8086'
let CloudOrg = `TimArchy`
let CloudBucket = `DATA`
const CLOUD_WEB_SOCKET_PORT = 3000;
const CloudClient = new InfluxDB({CloudUrl, CloudToken}).getQueryApi(CloudOrg)

const express = require('express');
const app = express();
const port = 8086;

app.post('/', (req, res) => {
  const writeApi = CloudClient.getWriteApi(CloudOrg, CloudBucket)

  writeApi.useDefaultTags({location: hostname()})

  let point = new Point('lumière')
  .tag('light_id', 'light kitchen')
  .stringField('value','test')

  writeApi.writePoint(point)

  writeApi.close().then(() => {
    console.log('WRITE FINISHED')
  })
  res.send('Hello World!');

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function GetAll() {
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

function PostData() {
  const writeApi = CloudClient.getWriteApi(CloudOrg, CloudBucket)

  writeApi.useDefaultTags({location: hostname()})

  let point = new Point('lumière')
  .tag('light_id', 'light kitchen')
  .stringField('value','test')

  writeApi.writePoint(point)

  writeApi.close().then(() => {
    console.log('WRITE FINISHED')
  })
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