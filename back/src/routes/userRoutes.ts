import { Router } from "express";
import { getAllUsersController,getUserByIdController,registerUserController } from "../controllers/usersController";
// import { checkCredentials } from "../services/credentialsService";
import { validateUser } from "../middlewares/validatorUsers"; 
// import auth from "../middlewares/auth";
const userRoutes:Router=Router();
userRoutes.get("/",getAllUsersController)
userRoutes.get("/:id",getUserByIdController)
userRoutes.post("/register",validateUser,registerUserController)
// userRoutes.post("/login",loginUserController)

 export default userRoutes;