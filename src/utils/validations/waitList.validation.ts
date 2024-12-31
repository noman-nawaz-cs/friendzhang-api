import { WaitListData } from "../interfaces/waitList.interface";

/**
 * Validate the request body for WaitList signup.
 * @param body - The request body.
 * @returns Validation result object.
 */
export const validateWaitListSignUp = (body: WaitListData) => {
  if (!body.name) {
    return {
      isValid: false,
      message: "Name is required.",
    };
  }
  if (!body.email) {
    return {
      isValid: false,
      message: "Email is required.",
    };
  }
  if (!/^\S+@\S+\.\S+$/.test(body.email)) {
    return {
      isValid: false,
      message: "Invalid email format.",
    };
  }
  return { isValid: true };
};
