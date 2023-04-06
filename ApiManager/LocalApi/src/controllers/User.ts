import { NextFunction, Request, Response } from "express";
import { client } from "@/middleware/database";
import { userSchema  } from "@/models/userRepository";

export default {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "method userGet[]" });
      return;
    } catch (error) {
      next(error);
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "method userGet" });
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "method userPost" });
      return;
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "method userUpdate" });
      return;
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "method userDelete" });
      return;
    } catch (error) {
      next(error);
    }
  },

};