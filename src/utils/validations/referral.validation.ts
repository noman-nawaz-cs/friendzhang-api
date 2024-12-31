import { ReferralRepository } from "../../repositories/referral.repository";
import { ReferralData } from "../interfaces/referral.interface";

/**
 * Check if an invitee with the given email or phone already exists in DynamoDB.
 * @param email - The email of the invitee.
 * @param phone - The phone number of the invitee.
 * @returns {Promise<{exists: boolean}>} - Returns true if a duplicate exists.
 */
export const isDuplicateReferral = async (
  email?: string,
  phone?: string
): Promise<{ exists: boolean }> => {
  const referralRepository = new ReferralRepository();
  let exists = false;

  if (email) {
    exists = await referralRepository.getReferralByEmail(email);
  }

  if (phone && !exists) {
    exists = await referralRepository.getReferralByPhone(phone);
  }

  return { exists };
};

/**
 * Validate the referral data payload.
 * @param payload - Referral data payload.
 * @returns {ValidationResult} - Validation result.
 */
export const validateReferral = (
  payload: ReferralData
): { valid: boolean; message?: string } => {
  const { referrer_email, invitees, referral_code } = payload as ReferralData;

  // Validate main referral fields
  if (!referrer_email || !referral_code) {
    return {
      valid: false,
      message: "Missing required fields: referrer_email or referral_code.",
    };
  }

  if (!Array.isArray(invitees) || invitees.length === 0) {
    return {
      valid: false,
      message: "At least one invitee must be provided.",
    };
  }

  // Validate each invitee
  for (const invitee of invitees) {
    if (!invitee.email && !invitee.phone) {
      return {
        valid: false,
        message: "Each invitee must have at least an email or a phone.",
      };
    }

    if (invitee.email && !/^\S+@\S+\.\S+$/.test(invitee.email)) {
      return {
        valid: false,
        message: `Invalid email format for invitee: ${invitee.email}`,
      };
    }

    if (
      invitee.phone &&
      !/^\+?[1-9]\d{1,14}$/.test(invitee.phone) // Validate phone number (E.164 format)
    ) {
      return {
        valid: false,
        message: `Invalid phone format for invitee: ${invitee.phone}`,
      };
    }
  }

  return { valid: true };
};
