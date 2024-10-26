import { Router } from "express";

//Obtengo las funciones del controlador
import { logIn } from "../controllers/logIn.controller.js";

const router = Router();

//Defino nombres de las rutas,
router.post("/api/logIn", logIn);
export default router;
