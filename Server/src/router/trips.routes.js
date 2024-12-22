import express from "express";
const router = express.Router();

import * as controller from "../controllers/trips.controller.js" 

router.get("/", controller.getTrips);

export default router;