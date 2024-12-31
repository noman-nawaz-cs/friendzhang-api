import { Request, Response } from "express";
import { EventLoggerService } from "../services/event-logger.service";
import { EventData } from "../utils/interfaces/event-logger.interface";

/**
 * Controller class to handle event logging.
 */
export class EventLoggerController {
  private eventLoggerService: EventLoggerService;

  constructor() {
    this.eventLoggerService = new EventLoggerService();
  }

  /**
   * Handle the event logging request.
   * @param req - Express request object.
   * @param res - Express response object.
   */
  public async handleEvent(
    req: Request<{}, {}, EventData>,
    res: Response
  ): Promise<Response> {
    const eventData = req.body;

    try {
      const response = await this.eventLoggerService.logEvent(eventData);
      return res.status(response.statusCode).json(response.body);
    } catch (error) {
      console.error("Error processing event:", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error.",
      });
    }
  }
}
