import { Router } from "express";
import healthRouter from "./health/health.routes.ts";
import authRouter from "./auth/Auth.routes.ts";
import roomRouter from "./room/Room.routes.ts";
import messageRouter from "./message/Message.Routes.ts";
import canvasRouter from "./canvas/canvas.routes.ts";

const appRouter = Router();

const prefix = "/api/v1";

appRouter.use(prefix + "/health", healthRouter);
appRouter.use(prefix + "/auth", authRouter);
appRouter.use(prefix + "/room", roomRouter);
appRouter.use(prefix + "/message", messageRouter);
appRouter.use(prefix + "/canvas", canvasRouter);

export default appRouter;
