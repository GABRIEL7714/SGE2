import { Router } from 'express';

//Obtengo las funciones del controlador
import { getAllUsers, createUser } from '../controllers/users.controller.js';

const router = Router();

//Defino nombres de las rutas,
router.get('/getAllUsers', getAllUsers);
router.post('/createUser', createUser);

export default router;
