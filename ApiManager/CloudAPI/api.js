import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';

/* Router */
import user from "./Routers/user.js"
import sensor from "./Routers/sensor.js"
import building from "./Routers/building.js"
import room from "./Routers/room.js"

/* CLOUD */
const token = "THISISMYTOKENAPI"
const url = 'http://localhost:8086'
const org = `TimArchy`

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