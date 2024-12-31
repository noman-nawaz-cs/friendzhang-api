import { WaitListData } from "../utils/interfaces/waitList.interface";
import { validateWaitListSignUp } from "../utils/validations/waitList.validation";
import { WaitListRepository } from "../repositories/waitList.repository";

export class WaitListService {
  private waitListRepository: WaitListRepository;

  constructor() {
    this.waitListRepository = new WaitListRepository();
  }

  /**
   * Processes the waitList signup request.
   * @param waitListData - The signup data.
   * @returns A response object containing status and message.
   */
  public async processSignUp(
    waitListData: WaitListData
  ): Promise<{ statusCode: number; body: object }> {
    // Validate data
    const { isValid, message } = validateWaitListSignUp(waitListData);

    if (!isValid) {
      return { statusCode: 400, body: { status: "error", message } };
    }

    const { email } = waitListData;

    try {
      // Check if the user already exists
      const userExists = await this.waitListRepository.getWaitListSignupByEmail(
        email
      );

      if (userExists) {
        return {
          statusCode: 400,
          body: {
            status: "error",
            message: `User with email ${email} is already on the waitList.`,
          },
        };
      }

      // Add user to the waitList
      await this.waitListRepository.addWaitListSignUp(waitListData);

      return {
        statusCode: 200,
        body: {
          status: "success",
          message: "WaitList signup successfully logged.",
        },
      };
    } catch (error) {
      console.error("Error saving WaitList signup", error);
      throw new Error("Failed to save waitList signup.");
    }
  }
}
