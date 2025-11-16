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
exports.crearTurno = void 0;
const appDataSource_1 = require("../config/appDataSource");
const Turno_1 = require("../entities/Turno");
const mailer_1 = require("../services/mailer");
const crearTurno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const turnoRepo = appDataSource_1.AppDataSource.getRepository(Turno_1.Turno);
        // Crear un objeto Turno a partir del body
        const nuevoTurno = turnoRepo.create(req.body);
        // Guardarlo en la DB → devuelve un solo objeto, no array
        const turnoGuardado = yield turnoRepo.save(nuevoTurno);
        // Enviar correo usando el objeto guardado
        yield (0, mailer_1.enviarCorreo)({
            to: turnoGuardado.email,
            subject: "Confirmación de turno",
            text: `Hola ${turnoGuardado.nombre}, tu turno a las ${turnoGuardado.hora} ha sido reservado.`,
        });
        res.status(201).json(turnoGuardado);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creando el turno", error });
    }
});
exports.crearTurno = crearTurno;
