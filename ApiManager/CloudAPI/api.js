import {InfluxDB, Point} from '@influxdata/influxdb-client'
import {hostname} from 'node:os'
import express from 'express';

/* CLOUD */
const token = "THISISMYTOKENAPI"
const url = 'http://localhost:8086'
let org = `TimArchy`
let bucket = `DATA`

const client = new InfluxDB({url, token})

const app = express();
const port = 3000;

app.post('/add', (req, res) => {
  let writeApi = client.getWriteApi(org, bucket)

  writeApi.useDefaultTags(
    {
      location: hostname()
    }
  )

  let point = new Point('lumière')
    .tag('light_id', 'light kitchen')
    .stringField('value', "test")

  writeApi.writePoint(point)
  console.log(point)

  writeApi
  .close()
  .then(() => {
    console.log('CLOSE FINISHED')
  })
  .catch(e => {
    console.log('CLOSE FAILED', e)
  })
  res.send('Hello World!');

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/get', (req, res) => {
  console.log("inside get")

  const str = ' |> filter(fn: (r) => r._value == "light kitchen")'
  const fluxQuery = 'from(bucket:"DATA") |> range(start: 0)'
  
  const query = `\
  from(bucket:"${bucket}")\
  |> range(start: 0)\
  `;
  let clientWrite = client.getQueryApi(org);
  clientWrite.queryRows(query, {
    next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        console.log(o)
        // filter to get value, field, measurement, light-id
    },
    complete() { 
        console.log('FINISHED')
    },
    error(error) {
        console.log('QUERY FAILED', error)
    },
  });
});