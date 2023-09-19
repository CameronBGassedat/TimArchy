import { NextFunction, Request, Response } from "express";
import { client } from "@/middleware/database";
import { roomSchema } from "@/models/roomRepository";


export default {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roomRepository = client.fetchRepository(roomSchema)
            await roomRepository.createIndex()
            const allPosts = await roomRepository.search().returnAll()
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
            const roomRepository = client.fetchRepository(roomSchema)
            await roomRepository.createIndex()
            let room = await roomRepository.fetch(req.params.id)
            res.json({ message: room });
            return;
        } catch (error) {
            next(error);
        }
    },
    post: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let newRoom = {
                id: req.body.id,
                name: req.body.name,
                sensors: req.body.sensors
            }
            console.log("test req");
            console.log(req.body);
            console.log(req.body.sensors);
            const roomRepository = client.fetchRepository(roomSchema)
            const post = await roomRepository.createAndSave(newRoom)
            //confirm,so
            res.status(201).send(newRoom)
            return;
        } catch (error) {
            console.log("ffffffffffff");
            next(error);
        }
    },
    patch: async (req: Request, res: Response, next: NextFunction) => {
        try {

            const roomRepository = client.fetchRepository(roomSchema)
            await roomRepository.createIndex()
            const room = await roomRepository.fetch(req.params.id)
            const roomTmp = room
            console.log("room")
            console.log(req.body)
            room.id = req.body.id ?? roomTmp.id
            room.name = req.body.name ?? roomTmp.name
            room.sensors = req.body.sensors ?? roomTmp.sensors

            await roomRepository.save(room)
            res.status(200).send(room)

            return;
        } catch (error) {
            next(error);
        }
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roomRepository = client.fetchRepository(roomSchema)
            await roomRepository.remove(req.params.id)
            res.json({ message: "delete with success" });
            return;
        } catch (error) {
            next(error);
        }
    },

};