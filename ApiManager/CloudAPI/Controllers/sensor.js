import Sensor from "../Models/sensor.mjs";
import Database from "../Database/influx.js";
import  {Point} from '@influxdata/influxdb-client'

export default {
  getall: async (req, res, next) => {
    try {
      console.log("Inside get all sensors")
      const query = `from(bucket:"SENSOR")
      |> range(start: -30d)
      |> keep(columns: ["_measurement", "id", "roomID", "_field", "_value"])`
      ;
      const database = new Database();
      database.GetPoint(query, res);
      return;
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      console.log("Inside get sensor by id")
      const query = `from(bucket:"SENSOR")
          |> range(start: -30d)
          |> filter(fn: (r) => r.id == "` + req.params.id +`")
          |> keep(columns: ["_measurement", "id", "roomID", "_field", "_value"])
          `;
      var database = new Database();
      database.GetPoint(query, res);
      return;
    } catch (error) {
      next(error);
    }
  },
  post :async (req, res, next) => {
    try {
      console.log("Inside sensor post")
      var jsonBody = new Sensor(req.body.id, req.body.name, req.body.data, req.body.roomID)
      var pointDT = new Point(jsonBody.name)
          .tag('id', jsonBody.id)
          .tag('roomID', jsonBody.roomID)
          .stringField('data', jsonBody.data)
      var database = new Database();
      database.PostPoint('SENSOR', pointDT, res);
    return;
    } catch (error) {
      next(error);
    }
  },
  patch : async () => {
    try {
      console.log("Inside sensor patch")
      return;
    } catch (error) {
      next(error);
    }
  },
  delete : async () => {
    try {
      console.log("Inside sensor delete")
      return;
    } catch (error) {
      next(error);
    }
  },
};