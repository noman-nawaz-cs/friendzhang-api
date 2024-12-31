// Interface for waitList request body
export interface WaitListData {
  name: string;
  email: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landing_page_id?: string;
  referral_code?: string;
  [key: string]: any; // Optional, allows for additional properties
}

// Interface for dynamoDb waitList item
export interface waitListItem extends WaitListData {
  user_id: string;
  createdAt: string;
}
