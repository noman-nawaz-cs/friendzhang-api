import express, { Request, Response } from "express";
import { referralController } from "../controllers/referral.controller";

const router = express.Router();

// Define the referral route
router.post("/refer-friend", (req: Request, res: Response) => {
  referralController(req, res);
});

export default router;
