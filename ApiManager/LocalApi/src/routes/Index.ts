import Index from "@/controllers/Index";
import { AuthentificationController } from "@/middleware/authent";
import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", Index.get);
router.post('/login',AuthentificationController.login)
router.post('/signup',AuthentificationController.signup )

export default router;
