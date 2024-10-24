import { Router } from 'express';

//Obtengo las funciones del controlador
import { getAllEvents } from '../controllers/events.controller.js';

const router = Router();

//Defino nombres de las rutas,
router.put('/getAllEvents', getAllEvents);

export default router;
