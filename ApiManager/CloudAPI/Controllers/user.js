import User from "../Models/user.mjs";

export default {
  getall: async (req, res) => {
    try {
      console.log("Inside get all users")
      return;
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      console.log("Inside get user by id")
      return;
    } catch (error) {
      next(error);
    }
  },
  post :async () => {
    try {
      console.log("Inside user post")
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