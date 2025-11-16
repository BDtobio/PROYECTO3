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
exports.validateCredentialService = exports.createCredentials = void 0;
const credentialRepository_1 = __importDefault(require("../repositories/credentialRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
let credentialsList = [];
let id = 1;
const createCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const encryptedPassword = yield passwordEncryption(password);
    const newCredentials = {
        username,
        password: encryptedPassword,
    };
    const credentialsSaved = credentialRepository_1.default.create(newCredentials);
    return yield credentialRepository_1.default.save(credentialsSaved);
});
exports.createCredentials = createCredentials;
const passwordEncryption = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordEncrypted = yield bcrypt_1.default.hash(password, 10);
    return passwordEncrypted;
});
const validateCredentialService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameFound = yield credentialRepository_1.default.findOneBy({ username });
    if (!usernameFound) {
        throw new Error(`El usuario ${username} no fue encontrado`);
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, usernameFound.password);
    if (!isPasswordValid) {
        throw new Error("Usuario o contraseña incorrectos");
    }
    return usernameFound.id;
});
exports.validateCredentialService = validateCredentialService;
