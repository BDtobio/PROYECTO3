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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appDataSource_1 = require("../config/appDataSource");
const Appointment_1 = require("../entities/Appointment");
const moment_1 = __importDefault(require("moment"));
const AppointmentRepository = appDataSource_1.AppDataSource.getRepository(Appointment_1.Appointment).extend({
    validateAllowAppointment: function (date, time) {
        const appointmentDateTime = (0, moment_1.default)(`${(0, moment_1.default)(date).format('YYYY-MM-DD')} ${time}`, "YYYY-MM-DD HH:mm");
        const now = (0, moment_1.default)();
        if (appointmentDateTime.isoWeekday() === 6 || appointmentDateTime.isoWeekday() === 7) {
            throw new Error("No se permiten turnos los fines de semana.");
        }
        if (appointmentDateTime.diff(now, 'hours') < 24) {
            throw new Error("El turno debe agendarse con al menos 24 horas de antelación.");
        }
        const hour = appointmentDateTime.hour();
        if (!((hour >= 11 && hour < 14) || (hour >= 20 && hour < 24))) {
            throw new Error("El turno debe estar entre las 11am y 2pm, o entre las 8pm y 12am.");
        }
    },
    validateExistingAppointment: function (userId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const appoinmentFound = yield this.findOne({
                where: {
                    user: {
                        id: userId
                    },
                    date: date,
                    time: time
                }
            });
            if (appoinmentFound) {
                throw new Error(`La cita con fecha: ${date}, y hora: ${time}, para el usuario con id ${userId}, ya existe.`);
            }
        });
    }
});
exports.default = AppointmentRepository;
