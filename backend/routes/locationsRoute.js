import express from "express";
import { getLocationById } from "../controllers/locationsController.js";

const router = express.Router();

router.get("/:id", getLocationById);

export default router;