import room from "@/controllers/Room";
import express from "express";
const router = express.Router();

/* capteur route section */
router.get("/", room.getAll);
router.get("/:id", room.get);
router.post("/", room.post);
router.patch("/:id", room.patch);
router.delete("/:id", room.delete);

export default router;