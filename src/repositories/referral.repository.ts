import { PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { dynamoDBClient } from "../config/dynamo";
import { marshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuid } from "uuid";
import { TableName } from "../types/table-names.enum";
import {
  ReferralData,
  Invitee,
  ReferralItem,
} from "../utils/interfaces/referral.interface";

export class ReferralRepository {
  /**
   * Adds a referral record to DynamoDB.
   * @param referralData - Data related to the referral.
   * @param invitee - Data related to the invitee being referred.
   * @returns A promise that resolves when the data is successfully added.
   */
  public async addReferral(
    referralData: ReferralData,
    invitee: Invitee
  ): Promise<void> {
    const referralItem: ReferralItem = {
      referral_id: uuid(),
      referrer_name: referralData.referrer_name,
      referrer_email: referralData.referrer_email,
      invitee_email: invitee.email,
      invitee_phone: invitee.phone,
      referral_code: referralData.referral_code,
      utm_source: referralData.utm_source,
      utm_medium: referralData.utm_medium,
      utm_campaign: referralData.utm_campaign,
      createdAt: new Date().toISOString(),
    };

    const params = {
      TableName: TableName.REFERRAL,
      Item: marshall(referralItem, { removeUndefinedValues: true }),
    };

    try {
      await dynamoDBClient.send(new PutItemCommand(params));
      console.log("Logged to DynamoDB:", referralItem);
    } catch (error) {
      console.error("Error in ReferralRepository - addReferral:", error);
      throw new Error("Failed to add referral to the database.");
    }
  }

  /**
   * Checks if a referral with the given email already exists in DynamoDB.
   * @param email - The invitee's email to check.
   * @returns Returns true if the referral exists, otherwise false.
   */
  public async getReferralByEmail(email: string): Promise<boolean> {
    const params = {
      TableName: TableName.REFERRAL,
      IndexName: "InviteeEmailIndex",
      KeyConditionExpression: "invitee_email = :email",
      ExpressionAttributeValues: marshall({ ":email": email }),
    };

    try {
      const result = await dynamoDBClient.send(new QueryCommand(params));
      return result.Items && result.Items.length > 0 ? true : false;
    } catch (error) {
      console.error("Error in ReferralRepository - getReferralByEmail:", error);
      throw new Error("Failed to fetch referral by email.");
    }
  }

  /**
   * Checks if a referral with the given phone number already exists in DynamoDB.
   * @param phone - The invitee's phone number to check.
   * @returns Returns true if the referral exists, otherwise false.
   */
  public async getReferralByPhone(phone: string): Promise<boolean> {
    const params = {
      TableName: TableName.REFERRAL,
      IndexName: "InviteePhoneIndex",
      KeyConditionExpression: "invitee_phone = :phone",
      ExpressionAttributeValues: marshall({ ":phone": phone }),
    };

    try {
      const result = await dynamoDBClient.send(new QueryCommand(params));
      return result.Items && result.Items.length > 0 ? true : false;
    } catch (error) {
      console.error("Error in ReferralRepository - getReferralByPhone:", error);
      throw new Error("Failed to fetch referral by phone.");
    }
  }
}
