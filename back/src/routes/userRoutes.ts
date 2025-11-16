import { Router } from "express";
import { 
  getAllUsersController,
  getUserByIdController,
  registerUserController,
  loginUserController,

} from "../controllers/usersController";

import { validateUser } from "../middlewares/validatorUsers";

const userRoutes: Router = Router();

// ---- ADMIN LOGIN ----

// ---- USER LOGIN & REGISTER ----
userRoutes.post("/login", loginUserController);
userRoutes.post("/register", validateUser, registerUserController);

// ---- GET USERS ----
userRoutes.get("/", getAllUsersController);

// ---- DINÁMICA (DEBE IR AL FINAL) ----
userRoutes.get("/:id", getUserByIdController);

export default userRoutes;
