import { Router } from "express";
import userRoutes from "./userRoutes";
import appointmentRoutes from "./appointmentRoutes";
import appointmentAdminRoutes from "./appointmentsAdminRoutes";

const indexRouter: Router = Router();

indexRouter.use("/users", userRoutes);
indexRouter.use("/appointments", appointmentRoutes);
indexRouter.use("/appointments/admin", appointmentAdminRoutes);

export default indexRouter;
