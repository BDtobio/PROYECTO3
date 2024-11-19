import { AppDataSource } from "./config/appDataSource";
import server from "./server";
require ("dotenv").config();
import "reflect-metadata"
const PORT=process.env.PORT

AppDataSource.initialize()
    .then(() => {
        console.log("Database Connection: OK!");
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error al conectar con la Base de Datos:", error);
    });
