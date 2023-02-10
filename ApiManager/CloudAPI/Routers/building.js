import Building from "../Controllers/building.js"
import express from "express";
const router = express.Router();

/* BUILDING */
router.get("/", Building.getall);
router.get("/:id", Building.get);
router.post("/", Building.post);
router.patch("/:id", Building.patch);
router.delete("/:id", Building.delete);

export default router;