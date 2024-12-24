import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { config } from "dotenv";
import path from "path";

config({
  path: path.resolve(__dirname, "../../.env"),
});

// Configure AWS DynamoDB client
export const dynamoDBClient = new DynamoDBClient({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});
