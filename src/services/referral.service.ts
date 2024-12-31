import { ReferralData } from "../utils/interfaces/referral.interface";
import { ReferralRepository } from "../repositories/referral.repository";
import { WaitListRepository } from "../repositories/waitList.repository";
import {
  validateReferral,
  isDuplicateReferral,
} from "../utils/validations/referral.validation";

export class ReferralService {
  private referralRepository: ReferralRepository;
  private waitListRepository: WaitListRepository;

  constructor() {
    this.referralRepository = new ReferralRepository();
    this.waitListRepository = new WaitListRepository();
  }

  /**
   * Process referral data and handle invitees.
   * @param referralData - Referral data from the client.
   */
  public async processReferral(
    referralData: ReferralData
  ): Promise<{ statusCode: number; body: object }> {
    try {
      // Validate referral data
      const validation = validateReferral(referralData);
      if (!validation.valid) {
        return {
          statusCode: 400,
          body: { status: "error", message: validation.message },
        };
      }

      for (const invitee of referralData.invitees) {
        // Check for duplicate email or phone
        const duplicateCheck = await isDuplicateReferral(
          invitee.email,
          invitee.phone
        );

        if (duplicateCheck.exists) {
          return {
            statusCode: 400,
            body: {
              status: "error",
              message: invitee.email
                ? `Invitee with email ${invitee.email} is already referred.`
                : `Invitee with phone ${invitee.phone} is already referred.`,
            },
          };
        }

        // Check if invitee email is already on the waitList
        const userExists = invitee.email
          ? await this.waitListRepository.getWaitListSignupByEmail(
              invitee.email
            )
          : false;

        if (userExists) {
          return {
            statusCode: 400,
            body: {
              status: "error",
              message: `User with email ${invitee.email} is already on the waitList.`,
            },
          };
        }

        // Log referral
        await this.referralRepository.addReferral(referralData, invitee);
      }

      return {
        statusCode: 200,
        body: {
          status: "success",
          message: "Referral successfully logged for all invitees.",
        },
      };
    } catch (error) {
      console.error("Error saving referral:", error);
      throw new Error("Failed to save referral");
    }
  }
}
