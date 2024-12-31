import { EmojiFeedbackData } from "../utils/interfaces/emoji-feedback.interface";
import { EmojiFeedbackRepository } from "../repositories/emoji-feedback.repository";
import { validateEmojiFeedback } from "../utils/validations/emoji-feedback.validation";

// Service class to handle business logic
export class EmojiFeedbackService {
  private emojiFeedbackRepository: EmojiFeedbackRepository;

  constructor() {
    this.emojiFeedbackRepository = new EmojiFeedbackRepository();
  }

  // Method to process the emoji feedback data
  public async processEmojiFeedback(feedbackData: EmojiFeedbackData) {
    const validation = validateEmojiFeedback(feedbackData);

    if (!validation.isValid) {
      return {
        statusCode: 400,
        body: {
          status: "error",
          message: validation.message,
        },
      };
    }

    try {
      const { step_id, emoji_type, user_session_id } = feedbackData;
      const existingFeedback =
        await this.emojiFeedbackRepository.getEmojiFeedback(
          user_session_id,
          step_id
        );

      if (existingFeedback) {
        if (existingFeedback.emoji_type === emoji_type) {
          // Feedback with the same emoji_type already exists
          return {
            statusCode: 200,
            body: {
              status: "success",
              message: "Feedback already exists with the same emoji_type.",
            },
          };
        } else {
          // Update feedback with the new emoji_type
          await this.emojiFeedbackRepository.updateEmojiFeedback(
            existingFeedback.emoji_feedback_id,
            emoji_type
          );
          return {
            statusCode: 200,
            body: {
              status: "success",
              message: "Feedback updated successfully with new emoji_type.",
            },
          };
        }
      } else {
        // Log new feedback
        await this.emojiFeedbackRepository.addEmojiFeedback(feedbackData);
        return {
          statusCode: 200,
          body: {
            status: "success",
            message: "Emoji feedback logged successfully.",
          },
        };
      }
    } catch (error) {
      console.error("Error saving emoji feedback:", error);
      throw new Error("Failed to save emoji feedback");
    }
  }
}
