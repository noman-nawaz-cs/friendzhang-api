// Interface for referral request body
export interface ReferralData {
  referrer_name: string;
  referrer_email: string;
  referral_code: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  invitees: Array<Invitee>;
}

// Interface for dynamoDb referral item
export interface ReferralItem {
  referral_id: string;
  referrer_name: string;
  referrer_email: string;
  invitee_email?: string;
  invitee_phone?: string;
  referral_code: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  createdAt: string;
}

export interface Invitee {
  email?: string;
  phone?: string;
}
