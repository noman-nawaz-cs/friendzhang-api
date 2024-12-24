import express, { Request, Response } from "express";
import { eventLoggerController } from "../controllers/event-logger.controller";

const router = express.Router();

// Define the event logger route
router.post("/log", (req: Request, res: Response) => {
  eventLoggerController(req, res);
});

export default router;
