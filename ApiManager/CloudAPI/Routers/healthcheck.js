import Healthcheck from "../Controllers/healthcheck.js"
import express from "express";
const router = express.Router();

/* Room */
router.get("/", Healthcheck.get);

export default router;