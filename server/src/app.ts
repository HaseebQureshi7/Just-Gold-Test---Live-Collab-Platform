import cors from "cors";
import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import { corsOptions } from "./infrastructure/config/corsOptions.config.ts";
import appRouter from "./presentation/routes/index.routes.ts";
import { globalErrorHandler } from "./shared/utils/GlobalErrorHandler.ts";
import cookieParser from 'cookie-parser';

config();

const app = express();

// middlewares
app.use(helmet()) // For XSS / Clickjacking
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(json({limit: "10mb"}));
app.use(urlencoded({limit: "10mb", extended: false}));

// router
app.use(appRouter)

// error handler
app.use(globalErrorHandler)

export default app