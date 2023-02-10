import Building from "../Models/building.mjs";

export default {
  getall: async (req, res) => {
    try {
      console.log("Inside get all buildings")
      return;
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      console.log("Inside get building by id")
      return;
    } catch (error) {
      next(error);
    }
  },
  post :async () => {
    try {
      console.log("Inside building post")
      return;
    } catch (error) {
      next(error);
    }
  },

  patch : async () => {
    try {
      console.log("Inside building patch")
      return;
    } catch (error) {
      next(error);
    }
  },
  delete : async () => {
    try {
      console.log("Inside building delete")
      return;
    } catch (error) {
      next(error);
    }
  },
};