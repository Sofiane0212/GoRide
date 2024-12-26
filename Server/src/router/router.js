import express from "express";
const router = express.Router();

import userRoutes from "./users.routes.js";
import authRoutes from "./auth.routes.js";
import tripRoutes from "./trips.routes.js";

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/trips", tripRoutes);

export default router;