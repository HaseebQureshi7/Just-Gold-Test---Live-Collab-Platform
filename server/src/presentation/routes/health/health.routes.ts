import { Request, Response, Router } from "express";
import { prisma } from "../../../infrastructure/database/client.ts";

const healthRouter = Router();

// Server connection check
healthRouter.get("/", (req, res) => {
    res.status(200).send({ message: "Server is healthy" })
})

// Server - Database connection check
healthRouter.get("/db", async (req: Request, res: Response) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({ message: "OK" });
    } catch (error) {
        res.status(500).json({ status: "Error! Server could not connect with the database!" });
    }
})

export default healthRouter