import { Router } from "express";

import {
  getMaterialsByEnvironmentId,
  getMaterialById,
  updateMaterial,
  createMaterial,
} from "../controllers/material.controller.js";

const router = Router();

router.post("/getMaterialsByEnvironmentId", getMaterialsByEnvironmentId);
router.post("/getMaterialById", getMaterialById);
router.post("/updateMaterial", updateMaterial);
router.post("/createMaterial", createMaterial);

export default router;
