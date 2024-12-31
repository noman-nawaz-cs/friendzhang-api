// Interface for feedback request body
export interface FeedbackData {
  user_email?: string;
  feedback_content: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landing_page_id?: string;
}

// Interface for dynamoDb feedback item
export interface FeedbackItem extends FeedbackData {
  feedback_id: string;
  createdAt: string;
}
