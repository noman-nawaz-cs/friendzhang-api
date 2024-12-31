import { FeedbackData } from "../utils/interfaces/feedback.interface";
import { FeedbackRepository } from "../repositories/feedback.repository";
import { validateFeedback } from "../utils/validations/feedback.validation";

export class FeedbackService {
  private feedbackRepository: FeedbackRepository;

  constructor() {
    this.feedbackRepository = new FeedbackRepository();
  }

  /**
   * Validate and submit feedback.
   * @param feedbackData - The feedback data to submit.
   */
  public async submitFeedback(feedbackData: FeedbackData): Promise<any> {
    // Validate feedback data
    const { isValid, message } = validateFeedback(feedbackData);

    if (!isValid) {
      return { statusCode: 400, body: { status: "error", message } };
    }

    // Save feedback data to the repository
    try {
      await this.feedbackRepository.addFeedback(feedbackData);
      return {
        statusCode: 200,
        body: {
          status: "success",
          message: "Feedback submitted successfully.",
        },
      };
    } catch (error) {
      console.error("Error saving feedback:", error);
      throw new Error("Failed to save feedback.");
    }
  }
}
