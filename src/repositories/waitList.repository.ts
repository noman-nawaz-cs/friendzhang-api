import { PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { dynamoDBClient } from "../config/dynamo";
import { TableName } from "../types/table-names.enum";
import {
  WaitListData,
  waitListItem,
} from "../utils/interfaces/waitList.interface";
import { v4 as uuid } from "uuid";

export class WaitListRepository {
  /**
   * Adds a waitList signup record to DynamoDB.
   * @param waitListData - Data to add to the waitList.
   * @returns A promise that resolves when the data is successfully added.
   */
  public async addWaitListSignUp(waitListData: WaitListData): Promise<void> {
    const waitListItem: waitListItem = {
      user_id: uuid(),
      name: waitListData.name,
      email: waitListData.email,
      utm_source: waitListData.utm_source,
      utm_medium: waitListData.utm_medium,
      utm_campaign: waitListData.utm_campaign,
      landing_page_id: waitListData.landing_page_id,
      referral_code: waitListData.referral_code,
      createdAt: new Date().toISOString(),
    };

    const params = {
      TableName: TableName.WAIT_LIST_SIGN_UP,
      Item: marshall(waitListItem, {
        removeUndefinedValues: true,
      }),
    };

    try {
      await dynamoDBClient.send(new PutItemCommand(params));
      console.log("Logged to DynamoDB:", waitListItem);
    } catch (error) {
      console.error("Error in WaitListRepository - addWaitListSignUp:", error);
      throw new Error("Failed to add waitList signup to the database.");
    }
  }

  /**
   * Checks if a user with the given email already exists in the waitList.
   * @param email - The email to check.
   * @returns Returns true if the user exists, otherwise false.
   */
  public async getWaitListSignupByEmail(email: string): Promise<boolean> {
    const queryParams = {
      TableName: TableName.WAIT_LIST_SIGN_UP,
      IndexName: "EmailIndex", // Ensure email index is configured
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: marshall({ ":email": email }),
    };

    try {
      const queryResult = await dynamoDBClient.send(
        new QueryCommand(queryParams)
      );
      return queryResult.Items && queryResult.Items.length > 0 ? true : false;
    } catch (error) {
      console.error(
        "Error in WaitListRepository - getWaitListSignupByEmail:",
        error
      );
      throw new Error("Failed to fetch waitList signup by email.");
    }
  }
}
