import Sensor from "../Models/user.mjs";
import Database from "../Database/influx.js";
import  {Point} from '@influxdata/influxdb-client'

export default {
  getall: async (req, res) => {
    try {
      console.log("Inside get all users")
      const query = `from(bucket:"USER")
            |> range(start: -30d)
            |> keep(columns: ["_measurement", "id", "_field", "_value"])`
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
      console.log("Inside get user by id")
      const query = `from(bucket:"USER")
                |> range(start: -30d)
                |> filter(fn: (r) => r.id == "` + req.params.id +`")
                |> keep(columns: ["_measurement", "id", "roomID", "_field", "_value"])`
                ;
      var database = new Database();
      database.getPoint(query);
      return;
    } catch (error) {
      next(error);
    }
  },
  post :async () => {
    try {
      console.log("Inside user post")
      jsonBody = new User(req.body.id, req.body.name, req.body.email)
      pointDT = new Point(jsonBody.name)
              .tag('id', jsonBody.id)
              .stringField('email', jsonBody.email)
      var database = new Database();
      database.PostPoint('USER', pointDT);
      return;
    } catch (error) {
      next(error);
    }
  },
  patch : async () => {
    try {
      console.log("Inside user patch")
      return;
    } catch (error) {
      next(error);
    }
  },
  delete : async () => {
    try {
      console.log("Inside user delete")
      return;
    } catch (error) {
      next(error);
    }
  },
};