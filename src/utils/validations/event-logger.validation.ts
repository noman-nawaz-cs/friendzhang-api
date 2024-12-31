import { EventData } from "../interfaces/event-logger.interface";

/**
 * Validate the event data.
 * @param eventData - The event data to validate.
 * @returns An object indicating whether the data is valid and an optional message.
 */
export const validateEventData = (
  eventData: EventData
): {
  isValid: boolean;
  message?: string;
} => {
  if (!eventData.event_type) {
    return { isValid: false, message: "Event type is required." };
  }
  if (!eventData.event_target) {
    return { isValid: false, message: "Event target is required." };
  }
  return { isValid: true };
};
