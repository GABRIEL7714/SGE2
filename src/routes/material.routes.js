import { Router } from "express";

import {
  getMaterialsByEnvironmentId,
  getMaterialById,
  updateMaterial,
} from "../controllers/material.controller.js";

const router = Router();

router.post("/getMaterialsByEnvironmentId", getMaterialsByEnvironmentId);
router.post("/getMaterialById", getMaterialById);
router.post("/updateMaterial", updateMaterial);

export default router;
