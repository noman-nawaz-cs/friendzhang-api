import { Request, Response } from "express";

// WaitList signup controller to handle POST requests.

export const waitListController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const waitListData = req.body;

  if (waitListData) {
    console.log(waitListData);
    return res.status(200).json({
      status: "success",
      message: `waitList Data logged in successfully`,
    });
  } else {
    console.error("Error processing waitList");
    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};
