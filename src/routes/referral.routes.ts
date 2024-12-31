import express, { Request, Response } from "express";
import { ReferralController } from "../controllers/referral.controller";

const router = express.Router();

router.post("/refer-friend", (req: Request, res: Response) => {
  const referralController = new ReferralController();
  referralController.handleReferral(req, res);
});

export default router;
