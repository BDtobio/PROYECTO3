import { Router } from "express";
import { 
  getAllUsersController,
  getUserByIdController,
  registerUserController,
  loginUserController,
} from "../controllers/userController"; // ← CAMBIO AQUÍ

import { validateUser } from "../middlewares/validatorUsers";

const userRoutes: Router = Router();

// LOGIN
userRoutes.post("/login", loginUserController);
userRoutes.post("/register", validateUser, registerUserController);

// GET USERS
userRoutes.get("/", getAllUsersController);

// DINÁMICA
userRoutes.get("/:id", getUserByIdController);

export default userRoutes;
