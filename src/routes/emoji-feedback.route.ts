import express, { Request, Response } from "express";
import { emojiFeedbackController } from "../controllers/emoji-feedback.controller";

const router = express.Router();

// Define the referral route
router.post("/feedback", (req: Request, res: Response) => {
  emojiFeedbackController(req, res);
});

export default router;
