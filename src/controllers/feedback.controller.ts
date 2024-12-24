import { Request, Response } from "express";

// Controller to handle the feedback logic
export const feedbackController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const feedbackData = req.body;

  if (feedbackData) {
    console.log(feedbackData);
    return res.status(200).json({
      status: "success",
      message: `Feedback Data logged in successfully`,
    });
  } else {
    console.error("Error processing feedback:");
    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};
