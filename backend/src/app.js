import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import { config } from "./config/env.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFound } from "./middleware/notFound.middleware.js";
import routes from "./routes/index.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));
app.use("/api/v1", routes);
app.use(notFound);
app.use(errorMiddleware);

export default app;
