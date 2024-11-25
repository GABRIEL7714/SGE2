import { Router } from "express";

// Importar las funciones del controlador de ambientes
import {
  getAllAmbientes,
  getAmbienteById,
  createAmbiente,
  updateAmbiente,
  deleteAmbiente,
} from "../controllers/environment.controller.js";

const router = Router();

// Definir las rutas para ambientes
router.get("/getAllAmbientes", getAllAmbientes);
router.post("/getAmbienteById", getAmbienteById);
router.post("/createAmbiente", createAmbiente);
router.post("/updateAmbiente", updateAmbiente);
router.post("/deleteAmbiente", deleteAmbiente);

export default router;