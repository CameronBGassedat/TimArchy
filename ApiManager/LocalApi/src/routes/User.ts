import user from "@/controllers/User";
import express from "express";
const router = express.Router();

/* user route section */
router.get("/", user.getAll);
router.get("/:id", user.get);
router.post("/",user.post);
router.patch("/:id",user.patch);
router.delete("/:id",user.delete);

export default router;