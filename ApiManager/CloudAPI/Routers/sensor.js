import Sensor from "../Controllers/sensor.js"
import express from "express";
const router = express.Router();

/* Sensor */
router.get("/", Sensor.getall);
router.get("/:id", Sensor.get);
router.post("/", Sensor.post);
router.patch("/:id", Sensor.patch);
router.delete("/:id", Sensor.delete);

export default router;