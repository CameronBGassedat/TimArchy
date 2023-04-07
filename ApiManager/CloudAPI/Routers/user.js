import User from "../Controllers/user.js"
import express from "express";
const router = express.Router();

/* User */
router.get("/", User.getall);
router.get("/:email", User.get);
router.post("/", User.post);
router.patch("/:id", User.patch);
router.delete("/:id", User.delete);

export default router;