// utils/validators/emoji-feedback.validator.ts

import { EmojiFeedbackData } from "../interfaces/emoji-feedback.interface";

/**
 * Validate the request body for Emoji Feedback.
 * @param body - The request body.
 * @returns Validation result object.
 */
export const validateEmojiFeedback = (body: EmojiFeedbackData) => {
  const { step_id, emoji_type, landing_page_id, user_session_id } = body;

  if (!step_id || !emoji_type || !landing_page_id || !user_session_id) {
    return {
      isValid: false,
      message: "Step id is required.",
    };
  } else if (!emoji_type) {
    return {
      isValid: false,
      message: "Emoji type is required.",
    };
  } else if (!landing_page_id) {
    return {
      isValid: false,
      message: "Landing page id is required.",
    };
  } else if (!user_session_id) {
    return {
      isValid: false,
      message: "User session id is required.",
    };
  }

  return { isValid: true };
};
