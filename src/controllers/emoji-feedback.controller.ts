import { Request, Response } from "express";
import { EmojiFeedbackService } from "../services/emoji-feedback.service";

// Controller class to handle the emoji feedback logic
export class EmojiFeedbackController {
  private emojiFeedbackService: EmojiFeedbackService;

  constructor() {
    this.emojiFeedbackService = new EmojiFeedbackService();
  }

  public async handleEmojiFeedback(
    req: Request,
    res: Response
  ): Promise<Response> {
    const feedbackData = req.body;

    try {
      const response = await this.emojiFeedbackService.processEmojiFeedback(
        feedbackData
      );
      return res.status(response.statusCode).json(response.body);
    } catch (error) {
      console.error("Error processing emoji feedback:", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error.",
      });
    }
  }
}
