import { Router } from "express";

//Obtengo las funciones del controlador
import {
  getAllUsers,
  createUser,
  changeRol,
} from "../controllers/users.controller.js";

const router = Router();

//Defino nombres de las rutas,
router.get("/getAllUsers", getAllUsers);
router.post("/createUser", createUser);
router.post("/changeRol", changeRol);

export default router;
