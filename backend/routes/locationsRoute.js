import express from "express";
import { getLocationById, getLocations } from "../controllers/locationsController.js";

const router = express.Router();

router.get("/:id", getLocationById);

router.get("/", getLocations)

export default router;