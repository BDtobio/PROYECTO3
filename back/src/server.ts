import express  from "express";
import morgan  from "morgan";
import cors from "cors"
import indexRouter from "./routes/indexRouter";

const server=express();
server.use(cors())
server.use(express.json())
server.use(morgan("dev"))
server.use(indexRouter)
export default server;