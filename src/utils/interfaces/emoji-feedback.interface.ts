// Interface for emoji feedback request body
export interface EmojiFeedbackData {
  step_id: string;
  emoji_type: string;
  landing_page_id: string;
  user_session_id: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

// Interface for dynamoDb emoji feedback item
export interface EmojiFeedbackItem extends EmojiFeedbackData {
  emoji_feedback_id: string;
  createdAt: string;
}
