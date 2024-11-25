import { Router } from "express";

import { inscribir } from "../controllers/inscriptions.controller.js";

const router = Router();

// //Defino nombres de las rutas,
router.post("/inscribir", inscribir);

export default router;
