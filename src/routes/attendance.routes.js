import { Router } from "express";
import { registrarAsistencia } from "../controllers/attendance.controller.js";

const router = Router();

router.post("/registrarAsistencia", registrarAsistencia);

export default router;
