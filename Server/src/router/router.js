import express from "express";
const router = express.Router();

import authRoutes from "./auth.routes.js";
import tripRoutes from "./trips.routes.js";

router.use("/auth", authRoutes);
router.use("/trips", tripRoutes);

export default router;