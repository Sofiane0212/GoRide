import express from "express";
//import { verifyToken } from "../middlewares/authMiddleware.js";
import * as controller from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", controller.login);

export default router;