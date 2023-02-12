import Building from "../Models/building.mjs";

export default {
  getall: async (req, res, next) => {
    try {
      console.log("Inside get all buildings")
      const query = `from(bucket:"BUILDING")
     |> range(start: -30d)
     |> keep(columns: ["_measurement", "id", "clientID", "_field", "_value"])`
     ;
     var database = Database();
      database.getPoint(query);
      return;
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      console.log("Inside get building by id")
      const query = `from(bucket:"BUILDING")
        |> range(start: -30d)
        |> filter(fn: (r) => r.id == "` + req.params.id +`")
        |> keep(columns: ["_measurement", "id", "roomID", "_field", "_value"])
        `;
        var database = Database();
        database.getPoint(query);
      return;
    } catch (error) {
      next(error);
    }
  },
  post :async (req, res, next) => {
    try {
      console.log("Inside building post")
      jsonBody = new Room(req.body.id, req.body.name, req.body.sensorID)
      pointDT = new Point(jsonBody.name)
          .tag('id', req.body.id)
          .stringField('sensorID', jsonBody.sensorID)
      writeApi = client.getWriteApi(org, 'ROOM')
      var database = Database();
      database.PostPoint('BUILDING', pointDT);
      return;
    } catch (error) {
      next(error);
    }
  },

  patch : async (req, res, next) => {
    try {
      console.log("Inside building patch")
      return;
    } catch (error) {
      next(error);
    }
  },
  delete : async (req, res, next) => {
    try {
      console.log("Inside building delete")
      return;
    } catch (error) {
      next(error);
    }
  },
};