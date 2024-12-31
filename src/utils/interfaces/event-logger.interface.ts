// Interface for event logger request body
export interface EventData {
  event_type: string;
  event_target: string;
  user_session_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landing_page_id?: string;
}

// Interface for dynamoDb event logger item
export interface EventItem extends EventData {
  event_logger_id: string;
  createdAt: string;
}
