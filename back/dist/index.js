"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appDataSource_1 = require("./config/appDataSource");
const server_1 = __importDefault(require("./server"));
require("dotenv").config();
require("reflect-metadata");
const PORT = process.env.PORT || 3000;
appDataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database Connection: OK!");
    server_1.default.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error("Error al conectar con la Base de Datos:", error);
});
