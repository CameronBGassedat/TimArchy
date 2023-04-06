import building from "@/controllers/Building";
import express from "express";
const router = express.Router();

/* actuator route section */
router.get("/",building.getAll);
router.get("/:id",building.get);
router.post("/",building.post);
router.patch("/:id",building.patch);
router.delete("/:id",building.delete);

export default router;