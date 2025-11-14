import { Router } from "express";
import { crearTurno } from "../controllers/turnocontroller";

const router = Router();

router.post("/", crearTurno);

export default router;
