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
exports.loginUserController = exports.registerUserController = exports.getUserByIdController = exports.getAllUsersController = void 0;
const usersServices_1 = require("../services/usersServices");
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersServices_1.getAllUsers)();
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(400).json({ message: "No se ha podido completar la solicitud", error });
    }
});
exports.getAllUsersController = getAllUsersController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, usersServices_1.getUserById)(parseInt(id));
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(404).json({ message: "usuario no encontrado", error });
    }
});
exports.getUserByIdController = getUserByIdController;
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, usersServices_1.registerUser)(req.body);
        res.status(201).json({ message: "Usuario registrado correctamente.",
            user: newUser.name
        });
    }
    catch (_a) {
        res.status(400).json({ message: "Hubo un error en el registro" });
    }
});
exports.registerUserController = registerUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS = process.env.ADMIN_PASS;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        return res.status(200).json({
            login: true,
            role: "admin",
            user: null,
        });
    }
    try {
        const response = yield (0, usersServices_1.loginUser)(req.body);
        return res.status(200).json(Object.assign(Object.assign({}, response), { role: "user" }));
    }
    catch (error) {
        return res.status(400).json({
            message: "Usuario o contraseña incorrectos",
            error,
        });
    }
});
exports.loginUserController = loginUserController;
// export const loginAdminController: RequestHandler = async (req, res) => {
//   const { username, password } = req.body;
//   const ADMIN_USER = process.env.ADMIN_USER;
//   const ADMIN_PASS = process.env.ADMIN_PASS;
//   if (username === ADMIN_USER && password === ADMIN_PASS) {
//     res.status(200).json({
//       ok: true,
//       message: "Login exitoso"
//     });
//     return;
//   }
//   res.status(401).json({
//     ok: false,
//     message: "Usuario o contraseña incorrectos"
//   });
// };
