import {InfluxDB, Point} from '@influxdata/influxdb-client'
import {hostname} from 'node:os'
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
// import Building from './controller/building.mjs'
// import Room from './controller/room.mjs'
// import User from './controller/user.mjs'
// import Sensor from './controller/sensor.mjs'

/* Router */
import user from "./Routers/user.js"
import sensor from "./Routers/sensor.js"
import building from "./Routers/building.js"
import room from "./Routers/room.js"

/* CLOUD */
const token = "THISISMYTOKENAPI"
const url = 'http://localhost:8086'
const org = `TimArchy`

const client = new InfluxDB({url, token})

const app = express();
const port = 3000;

app.use(
  bodyParser.json(),
  cors()
);

app.use("/building", building)
app.use("/user", user)
app.use("/room", room)
app.use("/sensor", sensor)

app.listen(port, () => { 
  console.log(`App listening at http://localhost:${port}`);
});

// //#region Add Components

// app.post('/add_building', (req, res) => {
//   console.log('posting Building');
//   jsonBody = new Buiding("BUILDING", req.body.id, req.body.name, req.body.clientID, req.body.sensorID)
//   pointDT = new Point(jsonBody.name)
//       .tag('id', jsonBody.id)
//       .tag('clientID', jsonBody.clientID)
//       .stringField('roomID', jsonBody.roomID)
//   writeApi = client.getWriteApi(org, 'BUILDING')

//   if (writeApi != null && pointDT != null) {
//     writeApi.useDefaultTags({location: hostname()})
//     writeApi.writePoint(pointDT)
//     writeApi
//     .close()
//     .then( () => {
//         console.log('CLOSE FINISHED')
//     })
//     .catch(e => {
//         console.log('CLOSE FAILED', e)
//     })
//     res.send('Building Added');
//   }
// });

// app.post('/add_room', (req, res) => {
//   console.log('posting Room');
//   jsonBody = new Room(req.body.id, req.body.name, req.body.sensorID)
//   pointDT = new Point(jsonBody.name)
//       .tag('id', req.body.id)
//       .stringField('sensorID', jsonBody.sensorID)
//   writeApi = client.getWriteApi(org, 'ROOM')

//   if (writeApi != null && pointDT != null) {
//     writeApi.useDefaultTags({location: hostname()})
//     writeApi.writePoint(pointDT)
//     writeApi
//     .close()
//     .then( () => {
//         console.log('CLOSE FINISHED')
//     })
//     .catch(e => {
//         console.log('CLOSE FAILED', e)
//     })
//     res.send('Room with id:'+ jsonBody.id +' Added');
//   }
// });

// app.post('/add_user', (req, res) => {
//   console.log('posting User');
//   jsonBody = new User(req.body.id, req.body.name, req.body.email)
//   pointDT = new Point(jsonBody.name)
//         .tag('id', jsonBody.id)
//         .stringField('email', jsonBody.email)
//   writeApi = client.getWriteApi(org, 'USER')

//   if (writeApi != null && pointDT != null) {
//     writeApi.useDefaultTags({location: hostname()})
//     writeApi.writePoint(pointDT)
//     writeApi
//     .close()
//     .then( () => {
//         console.log('CLOSE FINISHED')
//     })
//     .catch(e => {
//         console.log('CLOSE FAILED', e)
//     })
//     res.send('User with id:'+ jsonBody.id +'Added');
//   }
// });

// app.post('/add_sensor', (req, res) => {
//   console.log('posting Sensor');
//   var jsonBody = new Sensor(req.body.id, req.body.name, req.body.data, req.body.roomID)
//   var pointDT = new Point(jsonBody.name)
//         .tag('id', jsonBody.id)
//         .tag('roomID', jsonBody.roomID)
//         .stringField('data', jsonBody.data)

//   var writeApi = client.getWriteApi(org, 'SENSOR')
//   if (writeApi != null && pointDT != null) {
//     writeApi.useDefaultTags({location: hostname()})
//     writeApi.writePoint(pointDT)
//     writeApi
//     .close()
//     .then( () => {
//         console.log('CLOSE FINISHED')
//     })
//     .catch(e => {
//         console.log('CLOSE FAILED', e)
//     })
//     res.send('Sensor with ID : '+ jsonBody.id +' Added');
//   }
// });
// //#endregion


// //#region Get Mutilple Components

// app.get('/get_sensor', (req, res) => {
//   console.log("getting all sensors")
//   const MultipleSensorsQuery = `from(bucket:"SENSOR")
//   |> range(start: -30d)
//   |> keep(columns: ["_measurement", "id", "roomID", "_field", "_value"])`
//   ;

//   let objects = [];
//   let readApi = client.getQueryApi(org);

//   readApi.queryRows(MultipleSensorsQuery, {
//     next(row, tableMeta) {
//       const o = tableMeta.toObject(row);
//       var node = new Sensor(o._measurement, o.id, o.roomID, o._field, o._value)
//       objects.push(node)
//     },
//     complete() { 
//         console.log('FINISHED')
//         res.status(200).send(objects)
//     },
//     error(error) {
//         res.status(404).send("QUERY FAILED, "+ {error})
//     },
//   })
// });

// app.get('/get_users', (req, res) => {
//   console.log("getting all Users")
//   const MultipleSensorsQuery = `from(bucket:"USER")
//   |> range(start: -30d)
//   |> keep(columns: ["_measurement", "id", "_field", "_value"])`
//   ;

//   let objects = [];
//   let readApi = client.getQueryApi(org);

//   readApi.queryRows(MultipleSensorsQuery, {
//     next(row, tableMeta) {
//       const o = tableMeta.toObject(row);
//       var node = new Sensor(o._measurement, o.id, o.roomID, o._field, o._value)
//       objects.push(node)
//     },
//     complete() { 
//         console.log('FINISHED')
//         res.status(200).send(objects)
//     },
//     error(error) {
//         res.status(404).send("QUERY FAILED, "+ {error})
//     },
//   })
// });

// app.get('/get_rooms', (req, res) => {
//   console.log("getting all Rooms")
//   const MultipleSensorsQuery = `from(bucket:"ROOM")
//   |> range(start: -30d)
//   |> keep(columns: ["_measurement", "id", "_field", "_value"])`
//   ;

//   let objects = [];
//   let readApi = client.getQueryApi(org);

//   readApi.queryRows(MultipleSensorsQuery, {
//     next(row, tableMeta) {
//       const o = tableMeta.toObject(row);
//       var node = new Room("Room", o.id, o._measurement, o._value)
//       objects.push(node)
//     },
//     complete() { 
//         console.log('FINISHED')
//         res.status(200).send(objects)
//     },
//     error(error) {
//         res.status(404).send("QUERY FAILED, "+ {error})
//     },
//   })
// });

// app.get('/get_buildings', (req, res) => {
//   console.log("getting all Buildings")
//   const MultipleSensorsQuery = `from(bucket:"BUILDING")
//   |> range(start: -30d)
//   |> keep(columns: ["_measurement", "id", "clientID", "_field", "_value"])`
//   ;

//   let objects = [];
//   let readApi = client.getQueryApi(org);

//   readApi.queryRows(MultipleSensorsQuery, {
//     next(row, tableMeta) {
//       const o = tableMeta.toObject(row);
//       var node = new Buiding("Building", o.id, o._measurement, o.clientID, o._value)
//       objects.push(node)
//     },
//     complete() { 
//         console.log('FINISHED')
//         res.status(200).send(objects)
//     },
//     error(error) {
//         res.status(404).send("QUERY FAILED, "+ {error})
//     },
//   })
// });

// //#endregion

// //#region Get Single Components
// app.get('/get_user/:id', (req, res) => {
//   const query = `from(bucket:"USER")
//                 |> range(start: -30d)
//                 |> filter(fn: (r) => r.id == "` + req.params.id +`")
//                 |> keep(columns: ["_measurement", "id", "roomID", "_field", "_value"])`
//                 ;

//   let objects = [];
//   let readApi = client.getQueryApi(org);
//   readApi.queryRows(query, {
//     next(row, tableMeta) {
//       const o = tableMeta.toObject(row);
//       var user = new User(o._measurement, o.id, o.name, o._field)
//       console.log(o);
//       objects.push(user)
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

// app.get('/get_sensor:id', (req, res) => {
//   console.log("Getting single sensor with id : " + req.params.id)
//   let objects = [];
//   const SingleSensorQuery = `from(bucket:"SENSOR")
//   |> range(start: -30d)
//   |> filter(fn: (r) => r.id == "` + req.params.id +`")
//   |> keep(columns: ["_measurement", "id", "roomID", "_field", "_value"])
//   `;
  
//   let readApi = client.getQueryApi(org);
//   readApi.queryRows(SingleSensorQuery, {
//     next(row, tableMeta) {
//       const o = tableMeta.toObject(row);
//       var node = new Sensor(o._measurement, o.id, o.name, o.data, o.roomID)
//       objects.push(node)
//     },
//     complete() { 
//         console.log('FINISHED')
//         res.status(200).send(objects)
//     },
//     error(error) {
//         res.status(404).send("QUERY FAILED, "+ {error})
//     },
//   })
// });

// app.get('/get_room/:id', (req, res) => {
//   var requestedID = req.params.id
//   let objects = [];
//   var measurement = url.substring(url.lastIndexOf('/') + 1);

//   const SingleRoomQuery = `from(bucket:"ROOM")
//   |> range(start: -30d)
//   |> filter(fn: (r) => r.id == "` + req.params.id +`")
//   |> keep(columns: ["_measurement", "id", "roomID", "_field", "_value"])
//   `;
  
//   let readApi = client.getQueryApi(org);
//   readApi.queryRows(SingleRoomQuery, {
//     next(row, tableMeta) {
//       const o = tableMeta.toObject(row);
//       var node = new Room(o.id, o._measurement, o._value)
//       objects.push(node)
//     },
//     complete() { 
//         console.log('Finished getting single room with id : '+ req.params.id)
//         res.status(200).send(objects)
//     },
//     error(error) {
//         res.status(404).send("QUERY FAILED, "+ {error})
//     },
//   })
// });
//#endregion