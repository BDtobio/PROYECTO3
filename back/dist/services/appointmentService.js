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
exports.cancelAppointment = exports.createAppointment = exports.getAppointmentsById = exports.getAllAppointments = void 0;
const appDataSource_1 = require("../config/appDataSource");
const IAppointment_1 = require("../interfaces/IAppointment");
const appointmentRepository_1 = __importDefault(require("../repositories/appointmentRepository"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const getAllAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield appointmentRepository_1.default.find({
        relations: {
            user: true,
        }
    });
    const appointmentDTO = appointments.map(appointment => ({
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        userId: appointment.user.id,
    }));
    return appointmentDTO;
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield appointmentRepository_1.default.findOne({
        where: { id },
        relations: ["user"],
    });
    if (!appointment) {
        throw new Error(`No se encontró la cita con id: ${id}`);
    }
    const appointmentsDTO = {
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        userId: appointment.user.id,
    };
    return appointmentsDTO;
});
exports.getAppointmentsById = getAppointmentsById;
const createAppointment = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = appDataSource_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    try {
        yield queryRunner.startTransaction();
        yield appointmentRepository_1.default.validateExistingAppointment(appointmentData.userId, appointmentData.date, appointmentData.time);
        appointmentRepository_1.default.validateAllowAppointment(appointmentData.date, appointmentData.time);
        if (!appointmentData.userId) {
            throw new Error("El ID de usuario es obligatorio para crear un turno.");
        }
        const user = yield userRepository_1.default.findOneBy({ id: appointmentData.userId });
        if (!user) {
            throw new Error("El usuario con el ID especificado no existe.");
        }
        const newAppointment = appointmentRepository_1.default.create({
            date: appointmentData.date,
            time: appointmentData.time,
            status: IAppointment_1.appointmentStatus.active,
            user: user,
        });
        newAppointment.user = user;
        newAppointment.status = IAppointment_1.appointmentStatus.active;
        const savedAppointment = yield queryRunner.manager.save(newAppointment);
        yield queryRunner.commitTransaction();
        return {
            date: savedAppointment.date,
            time: savedAppointment.time,
            status: savedAppointment.status,
            userId: savedAppointment.user.id,
        };
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        if (error) {
            throw new Error(`${error}`);
        }
    }
    finally {
        yield queryRunner.release();
    }
});
exports.createAppointment = createAppointment;
const cancelAppointment = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("ID recibido en el servicio:", appointmentId);
        const appointment = yield appointmentRepository_1.default.findOneBy({ id: appointmentId });
        console.log("Turno encontrado en la base de datos:", appointment);
        if (!appointment) {
            console.error("Error: Turno no encontrado para ID:", appointmentId);
            throw new Error("Turno no encontrado");
        }
        if (appointment.status === 'cancelled') {
            console.error("Error: El turno ya está cancelado y no puede ser cancelado nuevamente");
            throw new Error("El turno ya está cancelado y no puede ser cancelado nuevamente");
        }
        const result = yield appointmentRepository_1.default.update({ id: appointmentId }, { status: 'cancelled' });
        console.log("Resultado del update:", result);
        if (result.affected === 0) {
            console.error("Error: No se pudo actualizar el estado del turno para ID:", appointmentId);
            throw new Error("No se pudo actualizar el estado del turno");
        }
        console.log("Estado del turno actualizado con éxito");
        return true;
    }
    catch (err) {
        console.log({ err });
        throw new Error('Error al cancelar el turno');
    }
});
exports.cancelAppointment = cancelAppointment;
