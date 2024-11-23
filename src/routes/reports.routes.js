import { Router } from "express";

//Obtengo las funciones del controlador
import { displayReports } from "../controllers/reports.controller.js";

const router = Router();

//Defino nombres de las rutas,
router.post("/getReports", displayReports);

export default router;
