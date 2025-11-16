"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentController = exports.createAppointmentController = exports.getAppointmentByIdController = exports.getAllAppointmentsController = void 0;
const appointmentService_1 = require("../services/appointmentService");
const getAllAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentService_1.getAllAppointments)();
        res.status(200).json({ appointments });
    }
    catch (err) {
        res.status(404).json({ message: "No se ha podido completar la solicitud", err });
    }
});
exports.getAllAppointmentsController = getAllAppointmentsController;
const getAppointmentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointment = yield (0, appointmentService_1.getAppointmentsById)(Number(id));
        res.status(200).json({ appointment });
    }
    catch (err) {
        res.status(404).json({ message: "No se ha podido completar la solicitud", err });
    }
});
exports.getAppointmentByIdController = getAppointmentByIdController;
const createAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, userId } = req.body;
    try {
        if (!req.body.userId) {
            res.status(400).json("No se pudo completar la solicitud");
            return;
        }
        const newAppointment = yield (0, appointmentService_1.createAppointment)({
            date,
            time,
            userId
        });
        res.status(201).json({ newAppointment });
        return;
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: "Error en el servidor",
            data: err instanceof Error ? err.detail ? err.detail : err.message : "error desconocido" });
        return;
    }
});
exports.createAppointmentController = createAppointmentController;
const cancelAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(req.params);
        const appointment = yield (0, appointmentService_1.cancelAppointment)(Number(id));
        console.log(req.params);
        res.status(200).json({ message: "Turno cancelado", appointment: appointment });
    }
    catch (err) {
        res.status(404).json({ message: "No se ha podido completar la solicitud", err });
    }
});
exports.cancelAppointmentController = cancelAppointmentController;
