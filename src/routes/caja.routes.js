import { Router } from "express";
import {
  getEventCajaById,
  registrarIngresoEgreso,
} from "../controllers/caja.controller.js";

const router = Router();

router.post("/getEventCajaById", getEventCajaById);
router.post("/registrarIngresoEgreso", registrarIngresoEgreso);

export default router;
