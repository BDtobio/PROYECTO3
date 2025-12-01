import { Router } from "express";
import {

  adminCreateAppointment,
  adminUpdateAppointment,
  adminDeleteAppointment
} from "../controllers/adminAppointmentsController";

const router = Router();

router.post("/", adminCreateAppointment);
router.put("/:id", adminUpdateAppointment);
router.delete("/:id", adminDeleteAppointment);


export default router;
