import Room from "../Models/room.mjs";

export default {
  getall: async (req, res) => {
    try {
      console.log("Inside get all rooms")
      return;
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      console.log("Inside get room by id")
      return;
    } catch (error) {
      next(error);
    }
  },
  post :async () => {
    try {
      console.log("Inside room post")
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