import Room from "../Controllers/room.js"
import express from "express";
const router = express.Router();

/* Room */
router.get("/", Room.getall);
router.get("/:id", Room.get);
router.post("/", Room.post);
router.patch("/:id", Room.patch);
router.delete("/:id", Room.delete);

export default router;