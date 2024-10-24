import { Router } from 'express';

//Obtengo las funciones del controlador
import { getAllEvents } from '../controllers/events.controller.js';

const router = Router();

//Defino nombres de las rutas,
router.get('/getAllEvents', getAllEvents);

export default router;
