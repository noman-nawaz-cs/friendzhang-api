import { Request, Response } from "express";
import { FeedbackService } from "../services/feedback.service";

// Controller class to handle the feedback logic
export class FeedbackController {
  private feedbackService: FeedbackService;

  constructor() {
    this.feedbackService = new FeedbackService();
  }

  // Method to handle the feedback request
  public async handleFeedback(req: Request, res: Response): Promise<Response> {
    const feedbackData = req.body;

    try {
      const response = await this.feedbackService.submitFeedback(feedbackData);
      return res.status(response.statusCode).json(response.body);
    } catch (error) {
      console.error("Error processing feedback:", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error.",
      });
    }
  }
}
