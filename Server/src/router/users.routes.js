import express from "express";
const router = express.Router();

import * as controller from "../controllers/users.controller.js";

router.get("/:id", controller.getProfile);

export default router;