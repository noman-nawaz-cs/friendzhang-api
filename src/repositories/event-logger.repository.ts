import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { dynamoDBClient } from "../config/dynamo";
import { TableName } from "../types/table-names.enum";
import {
  EventData,
  EventItem,
} from "../utils/interfaces/event-logger.interface";
import { v4 as uuid } from "uuid";

/**
 * Repository class for interacting with DynamoDB.
 */
export class EventLoggerRepository {
  /**
   * Save event to DynamoDB.
   * @param eventData - The event data to save.
   */
  public async addEvent(eventData: EventData): Promise<void> {
    const eventItem: EventItem = {
      event_logger_id: uuid(),
      event_type: eventData.event_type,
      event_target: eventData.event_target,
      user_session_id: eventData.user_session_id,
      utm_source: eventData.utm_source,
      utm_medium: eventData.utm_medium,
      utm_campaign: eventData.utm_campaign,
      landing_page_id: eventData.landing_page_id,
      createdAt: new Date().toISOString(),
    };

    const params = {
      TableName: TableName.EVENT_LOGGER,
      Item: marshall(eventItem, { removeUndefinedValues: true }),
    };

    try {
      await dynamoDBClient.send(new PutItemCommand(params));
      console.log("Event logged to DynamoDB:", eventItem);
    } catch (error) {
      console.error("Error logging event to DynamoDB:", error);
      throw new Error("Failed to add new event to database.");
    }
  }
}
