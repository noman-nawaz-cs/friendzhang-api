import express, { Request, Response } from "express";
import { EventLoggerController } from "../controllers/event-logger.controller";

const router = express.Router();

router.post("/log", (req: Request, res: Response) => {
  const eventLoggerController = new EventLoggerController();
  eventLoggerController.handleEvent(req, res);
});

export default router;
