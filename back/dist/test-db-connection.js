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
const pg_1 = require("pg");
require("dotenv/config");
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
            ssl: {
                rejectUnauthorized: false, // necesario en algunos proveedores
            },
        });
        try {
            yield client.connect();
            console.log("Conexión exitosa a la base de datos");
        }
        catch (error) {
            console.error("Error conectando a la base de datos:", error);
        }
        finally {
            yield client.end();
        }
    });
}
testConnection();
