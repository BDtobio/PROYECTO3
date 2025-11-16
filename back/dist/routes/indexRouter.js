"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const appointmentRoutes_1 = __importDefault(require("./appointmentRoutes"));
const indexRouter = (0, express_1.Router)();
indexRouter.use("/users", userRoutes_1.default);
indexRouter.use("/appointments", appointmentRoutes_1.default);
exports.default = indexRouter;
