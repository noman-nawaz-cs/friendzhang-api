import { FeedbackData } from "../interfaces/feedback.interface";

/**
 * Validate feedback data.
 * @param feedbackData - The feedback data to validate.
 * @returns Validation result with isValid and message.
 */
export const validateFeedback = (
  feedbackData: FeedbackData
): { isValid: boolean; message?: string } => {
  if (
    !feedbackData.feedback_content ||
    feedbackData.feedback_content.trim() === ""
  ) {
    return { isValid: false, message: "Feedback content is required." };
  }
  if (feedbackData.feedback_content.length > 100) {
    return {
      isValid: false,
      message: "Feedback content exceeds maximum length of 100 characters.",
    };
  }
  return { isValid: true };
};
