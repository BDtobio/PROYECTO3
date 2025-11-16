"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const validatorUsers_1 = require("../middlewares/validatorUsers");
const userRoutes = (0, express_1.Router)();
// ---- ADMIN LOGIN ----
// ---- USER LOGIN & REGISTER ----
userRoutes.post("/login", usersController_1.loginUserController);
userRoutes.post("/register", validatorUsers_1.validateUser, usersController_1.registerUserController);
// ---- GET USERS ----
userRoutes.get("/", usersController_1.getAllUsersController);
// ---- DINÁMICA (DEBE IR AL FINAL) ----
userRoutes.get("/:id", usersController_1.getUserByIdController);
exports.default = userRoutes;
