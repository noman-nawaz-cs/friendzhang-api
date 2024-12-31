import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { dynamoDBClient } from "../config/dynamo";
import { TableName } from "../types/table-names.enum";
import {
  FeedbackData,
  FeedbackItem,
} from "../utils/interfaces/feedback.interface";
import { v4 as uuid } from "uuid";

export class FeedbackRepository {
  /**
   * Save feedback to DynamoDB.
   * @param feedbackData - The feedback data to save.
   */
  public async addFeedback(feedbackData: FeedbackData): Promise<void> {
    const feedbackItem: FeedbackItem = {
      feedback_id: uuid(),
      user_email: feedbackData.user_email,
      feedback_content: feedbackData.feedback_content,
      utm_source: feedbackData.utm_source,
      utm_medium: feedbackData.utm_medium,
      utm_campaign: feedbackData.utm_campaign,
      landing_page_id: feedbackData.landing_page_id,
      createdAt: new Date().toISOString(),
    };

    const params = {
      TableName: TableName.FEEDBACK,
      Item: marshall(feedbackItem, {
        removeUndefinedValues: true,
      }),
    };

    try {
      await dynamoDBClient.send(new PutItemCommand(params));
      console.log("Feedback logged to DynamoDB:", feedbackItem);
    } catch (error) {
      console.error("Error logging new feedback:", error);
      throw new Error("Failed to add new feedback to database.");
    }
  }
}
