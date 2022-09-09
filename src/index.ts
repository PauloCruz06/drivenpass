import express, { json } from  "express";
import dotenv from "dotenv";
import cors from "cors";
import "express-async-errors";

import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config()

const server = express();
server.use(json());
server.use(cors());
server.use(errorHandler);

const port = Number(process.env.PORT) || 5000;
server.listen(port, () =>
    console.log(`Server up and running on port ${port}`)
);