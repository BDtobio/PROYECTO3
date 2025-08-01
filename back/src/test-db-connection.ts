import { Client } from "pg";
import "dotenv/config";

async function testConnection() {
  const client = new Client({
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
    await client.connect();
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
  } finally {
    await client.end();
  }
}

testConnection();
