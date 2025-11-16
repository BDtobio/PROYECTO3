"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turnocontroller_1 = require("../controllers/turnocontroller");
const router = (0, express_1.Router)();
router.post("/", turnocontroller_1.crearTurno);
exports.default = router;
