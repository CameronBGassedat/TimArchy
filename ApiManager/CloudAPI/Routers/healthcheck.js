import Healthcheck from "../Controllers/Healthcheck.js"
import express from "express";
const router = express.Router();

/* Room */
router.get("/", Healthcheck.get);

export default router;