import sensor from "@/controllers/Sensor";
import express from "express";
const router = express.Router();

/* capteur route section */
router.get("/",sensor.getAll);
router.get("/:id",sensor.get);
router.post("/",sensor.post);
router.patch("/:id",sensor.patch);
router.delete("/:id",sensor.delete);

export default router;