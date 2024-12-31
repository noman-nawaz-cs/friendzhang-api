import { EventData } from "../utils/interfaces/event-logger.interface";
import { EventLoggerRepository } from "../repositories/event-logger.repository";
import { validateEventData } from "../utils/validations/event-logger.validation";

/**
 * Service class for event logging logic.
 */
export class EventLoggerService {
  private eventLoggerRepository: EventLoggerRepository;

  constructor() {
    this.eventLoggerRepository = new EventLoggerRepository();
  }

  /**
   * Validate and log event data.
   * @param eventData - The event data to log.
   */
  public async logEvent(eventData: EventData): Promise<any> {
    // Validate event data
    const { isValid, message } = validateEventData(eventData);

    if (!isValid) {
      return { statusCode: 400, body: { status: "error", message } };
    }

    // Save event data to the repository
    try {
      await this.eventLoggerRepository.addEvent(eventData);
      return {
        statusCode: 200,
        body: {
          status: "success",
          message: "Event logged successfully.",
        },
      };
    } catch (error) {
      console.error("Error saving event:", error);
      throw new Error("Failed to log event.");
    }
  }
}
