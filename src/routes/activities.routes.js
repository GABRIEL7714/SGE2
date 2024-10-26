import { Router } from "express";

//Obtengo las funciones del controlador
import {
  getAllEventActivities,
  getNumberEventActivities,
  getEventActivitiesById,
} from "../controllers/activites.controller.js";

const router = Router();

//Defino nombres de las rutas,
router.get("/getAllEventActivities", getAllEventActivities);
router.post("/getNumberEventActivities", getNumberEventActivities);
router.post("/getEventActivitiesById", getEventActivitiesById);

export default router;
