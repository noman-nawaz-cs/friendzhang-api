import { Request, Response } from "express";
import { ReferralService } from "../services/referral.service";
import { ReferralData } from "../utils/interfaces/referral.interface";

export class ReferralController {
  private referralService: ReferralService;

  constructor() {
    this.referralService = new ReferralService();
  }

  public handleReferral = async (
    req: Request<{}, {}, ReferralData>,
    res: Response
  ): Promise<Response> => {
    const referralData = req.body;

    try {
      const response = await this.referralService.processReferral(referralData);
      return res.status(response.statusCode).json(response.body);
    } catch (error) {
      console.error("Error processing referral", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error.",
      });
    }
  };
}
