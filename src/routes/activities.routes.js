import { Router } from "express";

//Obtengo las funciones del controlador
import {
  getAllEventActivities,
  getNumberEventActivities,
  getEventActivitiesById,
  createActivity,
  getActivity,
  updateActivity,
} from "../controllers/activites.controller.js";

const router = Router();

//Defino nombres de las rutas,
router.get("/getAllEventActivities", getAllEventActivities);
router.post("/getNumberEventActivities", getNumberEventActivities);
router.post("/getEventActivitiesById", getEventActivitiesById);
router.post("/createActivity", createActivity);
router.post("/getActivity", getActivity);
router.post("/updateActivity", updateActivity);

export default router;
