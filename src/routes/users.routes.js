import { Router } from "express";

//Obtengo las funciones del controlador
import {
  getAllUsers,
  createUser,
  changeRol,
  getUserByNumeroDoc,
} from "../controllers/users.controller.js";

const router = Router();

//Defino nombres de las rutas,
router.get("/getAllUsers", getAllUsers);
router.post("/createUser", createUser);
router.post("/changeRol", changeRol);
router.post("/getUserByNumeroDoc", getUserByNumeroDoc);

export default router;
