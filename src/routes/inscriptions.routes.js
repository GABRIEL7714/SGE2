import { Router } from 'express';

//Obtengo las funciones del controlador
import {
  registerToEvent,
  envioBody,
} from '../controllers/inscriptions.controller.js';

const router = Router();

//Defino nombres de las rutas,
router.put('/registerToEvent/:userId/:eventId', registerToEvent);
router.post('/envioBody', envioBody);

export default router;
