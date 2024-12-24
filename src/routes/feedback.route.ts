import express, { Request, Response } from "express";
import { feedbackController } from "../controllers/feedback.controller";

const router = express.Router();

// Define the feedback route
router.post("/form", (req: Request, res: Response) => {
  feedbackController(req, res);
});

export default router;
