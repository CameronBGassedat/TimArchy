import Room from "../Models/room.mjs";

export default {
  getall: async (req, res) => {
    try {
      console.log("Inside get all rooms")
        const query = `from(bucket:"ROOM")
      |> range(start: -30d)
      |> keep(columns: ["_measurement", "id", "_field", "_value"])`
      ;
      return;
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      console.log("Inside get room by id")
      const query = `from(bucket:"ROOM")
        |> range(start: -30d)
        |> filter(fn: (r) => r.id == "` + req.params.id +`")
        |> keep(columns: ["_measurement", "id", "roomID", "_field", "_value"])
        `;
      return;
    } catch (error) {
      next(error);
    }
  },
  post :async () => {
    try {
      console.log("Inside room post")
      jsonBody = new Room(req.body.id, req.body.name, req.body.sensorID)
      pointDT = new Point(jsonBody.name)
          .tag('id', req.body.id)
          .stringField('sensorID', jsonBody.sensorID)
      
      var database = Database();
      database.PostPoint('ROOM', pointDT);

      return;
    } catch (error) {
      next(error);
    }
  },
  patch : async () => {
    try {
      console.log("Inside room patch")
      return;
    } catch (error) {
      next(error);
    }
  },
  delete : async () => {
    try {
      console.log("Inside room delete")
      return;
    } catch (error) {
      next(error);
    }
  },
};