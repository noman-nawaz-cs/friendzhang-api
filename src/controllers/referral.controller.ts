import { Request, Response } from "express";

// Controller to handle referrals.

export const referralController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const referralData = req.body;

  if (referralData) {
    console.log(referralData);
    return res.status(200).json({
      status: "success",
      message: `Referral Data logged in successfully`,
    });
  } else {
    console.error("Error processing referral:");
    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};
