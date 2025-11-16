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
exports.loginUser = exports.registerUser = exports.getUserById = exports.getAllUsers = void 0;
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const credentialsService_1 = require("./credentialsService");
// import { IUser } from "../interfaces/IUser";
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userRepository_1.default.find({
            relations: ['appointments'],
        });
        return users;
    }
    catch (error) {
        console.error('Error en el registro:', error);
        return undefined;
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository_1.default.findOne({
        where: { id },
        relations: ['appointments'],
    });
    if (!user) {
        throw new Error(`no se encontro el usuario con id:${id}`);
    }
    return user;
});
exports.getUserById = getUserById;
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const CredentialsUser = yield (0, credentialsService_1.createCredentials)(userData.username, userData.password);
    const newUserObject = {
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credentials: CredentialsUser,
    };
    const newUser = userRepository_1.default.create(newUserObject);
    return yield userRepository_1.default.save(newUser);
});
exports.registerUser = registerUser;
const loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const credentialId = yield (0, credentialsService_1.validateCredentialService)(user.username, user.password);
    const userFound = yield userRepository_1.default.findOne({
        where: {
            credentials: {
                id: credentialId
            }
        }
    });
    return {
        login: true,
        user: {
            id: (_a = userFound === null || userFound === void 0 ? void 0 : userFound.id) !== null && _a !== void 0 ? _a : 0,
            name: (_b = userFound === null || userFound === void 0 ? void 0 : userFound.name) !== null && _b !== void 0 ? _b : "",
            email: (_c = userFound === null || userFound === void 0 ? void 0 : userFound.email) !== null && _c !== void 0 ? _c : "",
            birthdate: (_d = userFound === null || userFound === void 0 ? void 0 : userFound.birthdate) !== null && _d !== void 0 ? _d : new Date(),
            nDni: (_e = userFound === null || userFound === void 0 ? void 0 : userFound.nDni) !== null && _e !== void 0 ? _e : 0
        }
    };
});
exports.loginUser = loginUser;
