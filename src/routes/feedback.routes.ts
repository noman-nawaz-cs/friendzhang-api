import express, { Request, Response } from "express";
import { FeedbackController } from "../controllers/feedback.controller";

const router = express.Router();

router.post("/form", (req: Request, res: Response) => {
  const feedbackController = new FeedbackController();
  feedbackController.handleFeedback(req, res);
});

export default router;
