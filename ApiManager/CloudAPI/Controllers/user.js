import User from "../Models/user.mjs";
import Database from "../Database/influx.js";
import  {Point} from '@influxdata/influxdb-client'

export default {
  getall: async (req, res, next) => {
    try {
      console.log("Inside get all users")
      const query = `from(bucket:"USER")
            |> range(start: -30d)
            |> keep(columns: ["_measurement", "id", "email", "_field", "_value"])`
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
      console.log("Inside get user by email")
      const query = `from(bucket:"USER")
                |> range(start: -30d)
                |> filter(fn: (r) => r.email == "` + req.params.email +`")
                |> keep(columns: ["_measurement", "id", "email", "roomID", "_field", "_value"])`
                ;
      var database = new Database();
      database.GetPoint(query, res);
      return;
    } catch (error) {
      next(error);
    }
  },
  post :async (req, res, next) => {
    try {
      console.log("Inside user post")
      var jsonBody = new User(req.body.id, req.body.name, req.body.email, req.body.password)
      var pointDT = new Point(jsonBody.name)
              .tag('id', jsonBody.id)
              .tag('email', jsonBody.email)
              .stringField('email', jsonBody.password)
      var database = new Database();
      database.PostPoint('USER', pointDT, res);
      return;
    } catch (error) {
      next(error);
    }
  },
  patch : async (req, res, next) => {
    try {
      console.log("Inside user patch")
      return;
    } catch (error) {
      next(error);
    }
  },
  delete : async (req, res, next) => {
    try {
      console.log("Inside user delete")
      return;
    } catch (error) {
      next(error);
    }
  },
};