import { NextFunction, Request, Response } from "express";
import { client } from "@/middleware/database";
import { buildingSchema } from "@/models/buildingRepository";

export default {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const buildingRepository = client.fetchRepository(buildingSchema)
      await buildingRepository.createIndex()
      const allPosts = await buildingRepository.search().returnAll()
      res.json({
        message: "method actuatorGet[]",
        data: allPosts
      });
      return;
    } catch (error) {
      next(error);
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const buildingRepository = client.fetchRepository(buildingSchema)
      await buildingRepository.createIndex()
      let build = await buildingRepository.fetch(req.params.id)
      res.json({ message: build });
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let newBuild = {
        name: req.body.name,
        rooms: req.body.rooms
      }
      const buildRepository = client.fetchRepository(buildingSchema)
      const post = await buildRepository.createAndSave(newBuild)
      //confirm,so
      res.status(201).send(newBuild)
      return;
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const buildRepository = client.fetchRepository(buildingSchema)
      await buildRepository.createIndex()
      const build = await buildRepository.fetch(req.params.id)
      const buildTmp = build
      build.name = req.body.name ?? buildTmp.name
      build.rooms = req.body.rooms ?? buildTmp.rooms
      await buildRepository.save(build)
      res.status(200).send(build)
      return;
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const buildRepository = client.fetchRepository(buildingSchema)
      await buildRepository.remove(req.params.id)
      res.json({ message: "delete with success" });
      return;
    } catch (error) {
      next(error);
    }
  },

};