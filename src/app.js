import express from "express";
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';

import router from "./routes/routes.js";
import swaggerDocument from "../swagger.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup());


export default app;



