import Sensor from "../Models/sensor.mjs";

export default {
  getall: async (req, res) => {
    try {
      console.log("Inside get all sensors")
      return;
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      console.log("Inside get sensor by id")
      return;
    } catch (error) {
      next(error);
    }
  },
  post :async () => {
    try {
      console.log("Inside sensor post")
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