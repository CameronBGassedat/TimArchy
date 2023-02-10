import {InfluxDB, Point} from '@influxdata/influxdb-client'
import {hostname} from 'node:os'
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'

const User = class {
    constructor(type, id, name, email) {
      this.type = type;
      this.id = id;
      this.name = name;
      this.email = email;
    }
  };

const Buiding = class {
    constructor(type, id, name, clientsID, roomsID) {
      this.type = type;
      this.id = id;
      this.name = name;
      this.clientsID = clientsID;
      this.roomsID = roomsID;
    }
  };

const Sensor = class {
    constructor(type, id, name, data, roomID) {
      this.type = type;
      this.id = id;
      this.name = name;
      this.data = data;
      this.roomID = roomID;
    }
  };

const Room = class {
    constructor(type, id, name, sensorsID) {
      this.type = type;
      this.id = id;
      this.name = name;
      this.sensorsID = sensorsID;
    }
  };

/* CLOUD */
const token = "THISISMYTOKENAPI"
const url = 'http://localhost:8086'
const org = `TimArchy`

const client = new InfluxDB({url, token})

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/add', (req, res) => {
  console.log('post');
  let jsonBody, pointDT, writeApi

  switch (req.body.type) {

    case 'User':
        jsonBody = new User(req.body.type, req.body.id, req.body.name, req.body.email)
        pointDT = new Point(jsonBody.type)
            .stringField('id', jsonBody.id)
            .stringField('name', jsonBody.name)
            .stringField('email', jsonBody.email)
        writeApi = client.getWriteApi(org, 'USER')
        break;

    case 'Room' :
      jsonBody = new Room(req.body.type, req.body.id, req.body.name, req.body.sensorsID)
        pointDT = new Point(jsonBody.type)
            .stringField('id', req.body.id)
            .stringField('name', jsonBody.name)
            .stringField('sensorsID', jsonBody.sensorsID)
        writeApi = client.getWriteApi(org, 'ROOM')
        break;

    case 'Building':
        jsonBody = new Buiding(req.body.type, req.body.id, req.body.name, req.body.clientID, req.body.sensorID)
        pointDT = new Point(jsonBody.type)
            .stringField('id', jsonBody.id)
            .stringField('name', jsonBody.name)
            .stringField('clientID', jsonBody.clientID)
            .stringField('sensorIDs', jsonBody.sensorID)
        writeApi = client.getWriteApi(org, 'BUILDING')
        break;

    case 'Sensor':
      jsonBody = new Sensor(req.body.type, req.body.id, req.body.name, req.body.data, req.body.roomID)
      pointDT = new Point(jsonBody.name)
            .tag('id', jsonBody.id)
            .tag('roomID', jsonBody.roomID)
            .stringField('data', jsonBody.data)
        writeApi = client.getWriteApi(org, 'SENSOR')
        break;
    default:
        break;
    }
    console.log(pointDT)

    if (writeApi != null && pointDT != null) {
        writeApi.useDefaultTags({location: hostname()})
        writeApi.writePoint(pointDT)
        writeApi
        .close()
        .then( () => {
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

app.get('/get_users', (req, res) => {
  const query = `\
  from(bucket:"USER")\
  |> range(start: 0)\
  `;
  const filter = '\
  |> filter(fn: (r) => r._measurement == "User")\
  ';

  let objects = [];
  let readApi = client.getQueryApi(org);
  readApi.queryRows(query, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      var user = new User(o._measurement, o.id, o.name, o._field)
      console.log(o);
      objects.push(user)
    },
    complete() { 
        console.log('FINISHED')
        res.status(200).send(objects)
    },
    error(error) {
        console.log('QUERY FAILED', error)
        res.status(404).send("QUERY FAILED, "+ {error})
    },
  })
});

app.get('/get_sensors', (req, res) => {

  const alltables = `from(bucket:"SENSOR")
  |> range(start: -30d)
  |> keep(columns: ["_measurement", "id", "roomID", "_field", "_value"])`
  ;

  const singletable = `from(bucket:"SENSOR")
  |> range(start: -30d)
  |> filter(fn: (r) => r._measurement == "white")
  |> keep(columns: ["_measurement", "id", "roomID", "_field", "_value"])
  `;
  
  let objects = [];
  let readApi = client.getQueryApi(org);

  readApi.queryRows(another, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      var node = new Sensor(o._measurement, o.id, o.name, o.data, o.roomID)
      console.log("field :" + o._measurement);
      console.log("field :" + o.id);
      console.log("field :" + o.roomID);
      console.log("field :" + o._field);
      console.log("field :" + o._value);
      console.log("field :" + o.PointDT);

      objects.push(node)
    },
    complete() { 
        console.log('FINISHED')
        //handleObjects(objects);
        res.status(200).send(objects)
    },
    error(error) {
        console.log('QUERY FAILED', error)
        res.status(404).send("QUERY FAILED, "+ {error})
    },
  })
  // console.log('Printing objects caught')
  // console.log(objects)
  // console.log('End of print')
});


// app.get('/get_buildings', (req, res) => {
//   const query = `from(bucket:"BUILDING") |> range(start: 0) `;
//   let objects = [];
//   let readApi = client.getQueryApi(org);

//   readApi.queryRows(query, {
//     next(row, tableMeta) {
//       const o = tableMeta.toObject(row);
//       var building = new Building(o._measurement, o.id, o.name, o._field)
//       console.log(o);
//       objects.push(building)
//     },
//     complete() { 
//         console.log('FINISHED')
//         res.status(200).send(objects)
//     },
//     error(error) {
//         console.log('QUERY FAILED', error)
//         res.status(404).send("QUERY FAILED, "+ {error})
//     },
//   })
// });

// app.get('/get_rooms', (req, res) => {
//   const query = `from(bucket:"ROOM") |> range(start: 0) `;
//   let objects = [];
//   let readApi = client.getQueryApi(org);

//   readApi.queryRows(query, {
//     next(row, tableMeta) {
//       const o = tableMeta.toObject(row);
//       var room = new Room(o._measurement, o.id, o.name, o._field)
//       console.log(o);
//       objects.push(room)
//     },
//     complete() { 
//         console.log('FINISHED')
//         res.status(200).send(objects)
//     },
//     error(error) {
//         console.log('QUERY FAILED', error)
//         res.status(404).send("QUERY FAILED, "+ {error})
//     },
//   })
// });