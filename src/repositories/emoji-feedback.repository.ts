import {
  EmojiFeedbackItem,
  EmojiFeedbackData,
} from "../utils/interfaces/emoji-feedback.interface";
import { TableName } from "../types/table-names.enum";
import { dynamoDBClient } from "../config/dynamo";
import {
  QueryCommand,
  UpdateItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuid } from "uuid";

// Repository class to interact with DynamoDB
export class EmojiFeedbackRepository {
  /**
   * Fetches the existing feedback from DynamoDB for a given user session and step ID.
   * @param user_session_id - The unique session ID for the user.
   * @param step_id - The step ID for which feedback is being retrieved.
   * @returns {Promise<EmojiFeedbackItem | null>} - Returns the feedback item if it exists, otherwise returns null.
   */
  public async getEmojiFeedback(
    user_session_id: string,
    step_id: string
  ): Promise<EmojiFeedbackItem | null> {
    const params = {
      TableName: TableName.EMOJI_FEEDBACK,
      IndexName: "UserSessionStepIndex", // Use the GSI name
      KeyConditionExpression:
        "user_session_id = :userSessionId AND step_id = :stepId",
      ExpressionAttributeValues: {
        ":userSessionId": { S: user_session_id },
        ":stepId": { S: step_id },
      },
    };

    try {
      const result = await dynamoDBClient.send(new QueryCommand(params));
      // Safely cast the unmarshalled result to EmojiFeedbackItem
      return result.Items?.length
        ? (unmarshall(result.Items[0]) as EmojiFeedbackItem)
        : null;
    } catch (error) {
      console.error("Error fetching existing emoji feedback:", error);
      throw new Error("Failed to fetch existing emoji feedback from database.");
    }
  }

  /**
   * Updates an existing feedback entry in DynamoDB for the specified emoji feedback ID.
   * @param emoji_feedback_id - The unique ID of the emoji feedback to update.
   * @param emoji_type - The new emoji type to update in the feedback.
   * @returns {Promise<void>} - A promise that resolves when the update is successful.
   */
  public async updateEmojiFeedback(
    emoji_feedback_id: string,
    emoji_type: string
  ): Promise<void> {
    const feedbackKey = {
      emoji_feedback_id: { S: emoji_feedback_id },
    };

    const params = {
      TableName: TableName.EMOJI_FEEDBACK,
      Key: feedbackKey,
      UpdateExpression: "SET emoji_type = :newEmoji, createdAt = :newCreatedAt",
      ExpressionAttributeValues: {
        ":newEmoji": { S: emoji_type },
        ":newCreatedAt": { S: new Date().toISOString() },
      },
    };

    try {
      await dynamoDBClient.send(new UpdateItemCommand(params));
      console.log("Emoji Feedback updated successfully for:", feedbackKey);
    } catch (error) {
      console.error("Error updating emoji feedback:", error);
      throw new Error("Failed to update emoji feedback.");
    }
  }

  /**
   * Logs new feedback to DynamoDB with the provided emoji feedback data.
   * @param emojiFeedbackData - The data containing the emoji feedback information.
   * @returns {Promise<void>} - A promise that resolves when the feedback is logged successfully.
   */
  public async addEmojiFeedback(
    emojiFeedbackData: EmojiFeedbackData
  ): Promise<void> {
    const feedbackEntry: EmojiFeedbackItem = {
      emoji_feedback_id: uuid(),
      step_id: emojiFeedbackData.step_id,
      emoji_type: emojiFeedbackData.emoji_type,
      landing_page_id: emojiFeedbackData.landing_page_id,
      user_session_id: emojiFeedbackData.user_session_id,
      utm_source: emojiFeedbackData.utm_source,
      utm_medium: emojiFeedbackData.utm_medium,
      utm_campaign: emojiFeedbackData.utm_campaign,
      createdAt: new Date().toISOString(),
    };

    const params = {
      TableName: TableName.EMOJI_FEEDBACK,
      Item: marshall(feedbackEntry, {
        removeUndefinedValues: true,
      }),
    };

    try {
      await dynamoDBClient.send(new PutItemCommand(params));
      console.log("New emoji feedback logged successfully:", feedbackEntry);
    } catch (error) {
      console.error("Error logging new emoji feedback:", error);
      throw new Error("Failed to add new emoji feedback to database.");
    }
  }
}
