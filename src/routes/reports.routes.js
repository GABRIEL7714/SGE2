import { Router } from "express";

// Obtengo las funciones del controlador
import {
  displayReports,
  obtenerUsuariosPorEvento,
} from "../controllers/reports.controller.js";

const router = Router();

// Defino nombres de las rutas
router.post("/getUsersPerEvent", obtenerUsuariosPorEvento);
router.post("/getReports", displayReports);

// Montar el router en el servidor principal

export default router;
