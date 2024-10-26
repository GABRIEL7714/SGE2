import { Router } from "express";

//Obtengo las funciones del controlador
import {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
} from "../controllers/events.controller.js";

const router = Router();

//Defino nombres de las rutas,
router.get("/getAllEvents", getAllEvents);

router.post("/getEvent", getEvent);
router.post("/createEvent", createEvent);
router.post("/updateEvent", updateEvent);

export default router;
