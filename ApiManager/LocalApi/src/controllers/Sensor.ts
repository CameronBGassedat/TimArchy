import { NextFunction, Request, Response } from "express";
import { client } from "@/middleware/database";
import { sensorSchema } from "@/models/sensorRepository";


export default {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensorRepository = client.fetchRepository(sensorSchema)
      await sensorRepository.createIndex()
      const allPosts = await sensorRepository.search().returnAll()
      res.json({
        data: allPosts
      });
      return;
    } catch (error) {
      next(error);
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensorRepository = client.fetchRepository(sensorSchema)
      await sensorRepository.createIndex()
      let sensor = await sensorRepository.fetch(req.params.id)
      res.json({ message: sensor });
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let newSensor = {
        id: req.body.id,
        name: req.body.name,
        value: req.body.value,
        capacity: req.body.capacity
      }
      const sensorRepository = client.fetchRepository(sensorSchema)
      const post = await sensorRepository.createAndSave(newSensor)
      res.status(201).send(newSensor)
      return;
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {

      const sensorRepository = client.fetchRepository(sensorSchema)
      await sensorRepository.createIndex()

      const sensor = await sensorRepository.fetch(req.params.id)
      console.log(sensor)
      const sensorTmp = sensor
      sensor.id = req.body.id ?? sensorTmp.id
      sensor.name = req.body.name ?? sensorTmp.name
      sensor.value = req.body.value ?? sensorTmp.value
      sensor.capacity = req.body.capacity ?? sensorTmp.capacity

      await sensorRepository.save(sensor)
      res.status(200).send(sensor)

      return;
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensorRepository = client.fetchRepository(sensorSchema)
      await sensorRepository.remove(req.params.id)
      res.json({ message: "delete with success" });
      return;
    } catch (error) {
      next(error);
    }
  },

};