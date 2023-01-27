import {InfluxDB, Point} from '@influxdata/influxdb-client'
import {hostname} from 'node:os'
import express from 'express'
import bodyParser from 'body-parser';

const User = class {
    constructor(type, id, name, email) {
      this.type = type;
      this.id = id;
      this.name = name;
      this.email = email;
    }
  };

const Buiding = class {
    constructor(id, name, clientID, sensorID) {
      this.id = id;
      this.name = name;
      this.clientID = clientID;
      this.sensorID = sensorID;
    }
  };

const Sensor = class {
    constructor(id, name, data, buildingID) {
      this.id = id;
      this.name = name;
      this.data = data;
      this.buildingID = buildingID;
    }
  };

/* CLOUD */
const token = "THISISMYTOKENAPI"
const url = 'http://localhost:8086'
const org = `TimArchy`

const client = new InfluxDB({url, token})

const app = express();
const port = 3000;

app.use( bodyParser.json() );

app.post('/add', (req, res) => {
  let jsonBody
  let pointDT
  let writeApi

  switch (req.body.type) {
    case 'User':
        jsonBody = new User(req.body.type, req.body.id, req.body.name, req.body.email)
        pointDT = new Point(jsonBody.type)
            .tag(req.body.id, 'id')
            .stringField('name', jsonBody.name)
            .stringField('email', jsonBody.email)
        writeApi = client.getWriteApi(org, 'DATA')
        break;
    
    case 'Building':
        jsonBody = new Buiding(req.body.id, req.body.name, req.body.clientID, req.body.sensorID)
        pointDT = new Point(jsonBody.type)
            .tag(req.body.id, "id")
            .stringField(jsonBody.name, 'name')
            .stringField(jsonBody.clientID, 'ClientID')
            .stringField(jsonBody.sensorID,'SensorIDs')
        writeApi = client.getWriteApi(org, 'BUILDING')
        break;
    
    case 'Sensor':
        jsonBody = new Sensor(req.body.id, req.body.name, req.body.data, req.body.buildingID)
        pointDT = new Point(jsonBody.type)
            .tag(req.body.id, 'id')
            .stringField('name', jsonBody.name)
            .stringField('email', jsonBody.email)
        writeApi = client.getWriteApi(org, 'SENSOR')
        break;
    default:
        break;
    }
    console.log( pointDT)

    if (writeApi != null && pointDT != null) {
        writeApi.useDefaultTags({location: hostname()})
        writeApi.writePoint(pointDT)
        writeApi
        .close()
        .then(() => {
            console.log('CLOSE FINISHED')
        })
        .catch(e => {
            console.log('CLOSE FAILED', e)
        })
        res.send('Hello World!');
    }
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

app.post('/delete', (req, res) => {
    // update value, only change the field
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