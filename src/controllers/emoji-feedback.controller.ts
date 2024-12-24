import { Request, Response } from "express";

// Controller to handle the emoji feedback logic
export const emojiFeedbackController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const emojiFeedbackData = req.body;

  if (emojiFeedbackData) {
    console.log(emojiFeedbackData);
    return res.status(200).json({
      status: "success",
      message: `Emoji Feedback Data logged in successfully`,
    });
  } else {
    console.error("Error processing emoji feedback:");
    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};
