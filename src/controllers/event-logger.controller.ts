import { Request, Response } from "express";

// event logger controller to handle POST requests.

export const eventLoggerController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventLoggerData = req.body;

  if (eventLoggerData) {
    console.log(eventLoggerData);
    return res.status(200).json({
      status: "success",
      message: `event logger data logged in successfully`,
    });
  } else {
    console.error("Error processing event logger data");
    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};
