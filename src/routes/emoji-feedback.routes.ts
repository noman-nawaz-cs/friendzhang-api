import express, { Request, Response } from "express";
import { EmojiFeedbackController } from "../controllers/emoji-feedback.controller";

const router = express.Router();

router.post("/feedback", (req: Request, res: Response) => {
  const controller = new EmojiFeedbackController();
  controller.handleEmojiFeedback(req, res);
});

export default router;
