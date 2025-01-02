import {
  CreateTableCommand,
  CreateTableCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { dynamoDBClient } from "./src/config/dynamo";
import { TableName } from "./src/types/table-names.enum";

interface TableSchema {
  TableName: string;
  KeySchema: Array<{ AttributeName: string; KeyType: "HASH" | "RANGE" }>;
  AttributeDefinitions: Array<{
    AttributeName: string;
    AttributeType: "S" | "N" | "B";
  }>;
  ProvisionedThroughput?: {
    ReadCapacityUnits: number;
    WriteCapacityUnits: number;
  };
  GlobalSecondaryIndexes?: Array<{
    IndexName: string;
    KeySchema: Array<{ AttributeName: string; KeyType: "HASH" | "RANGE" }>;
    Projection: { ProjectionType: "ALL" | "KEYS_ONLY" | "INCLUDE" };
    ProvisionedThroughput: {
      ReadCapacityUnits: number;
      WriteCapacityUnits: number;
    };
  }>;
}

const tables: TableSchema[] = [
  // WaitListSignUp table
  {
    TableName: TableName.WAIT_LIST_SIGN_UP,
    KeySchema: [{ AttributeName: "user_id", KeyType: "HASH" }],
    AttributeDefinitions: [
      { AttributeName: "user_id", AttributeType: "S" },
      { AttributeName: "email", AttributeType: "S" },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "EmailIndex",
        KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
  // Referral table
  {
    TableName: TableName.REFERRAL,
    KeySchema: [{ AttributeName: "referral_id", KeyType: "HASH" }],
    AttributeDefinitions: [
      { AttributeName: "referral_id", AttributeType: "S" },
      { AttributeName: "invitee_email", AttributeType: "S" },
      { AttributeName: "invitee_phone", AttributeType: "S" },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "InviteeEmailIndex",
        KeySchema: [{ AttributeName: "invitee_email", KeyType: "HASH" }],
        Projection: {
          ProjectionType: "ALL",
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
      {
        IndexName: "InviteePhoneIndex",
        KeySchema: [{ AttributeName: "invitee_phone", KeyType: "HASH" }],
        Projection: {
          ProjectionType: "ALL",
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
  // EmojiFeedback table
  {
    TableName: TableName.EMOJI_FEEDBACK,
    KeySchema: [{ AttributeName: "emoji_feedback_id", KeyType: "HASH" }],
    AttributeDefinitions: [
      { AttributeName: "emoji_feedback_id", AttributeType: "S" },
      { AttributeName: "user_session_id", AttributeType: "S" },
      { AttributeName: "step_id", AttributeType: "S" },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "UserSessionStepIndex",
        KeySchema: [
          { AttributeName: "user_session_id", KeyType: "HASH" },
          { AttributeName: "step_id", KeyType: "RANGE" },
        ],
        Projection: { ProjectionType: "ALL" },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
  // Feedback table
  {
    TableName: TableName.FEEDBACK,
    KeySchema: [{ AttributeName: "feedback_id", KeyType: "HASH" }],
    AttributeDefinitions: [
      { AttributeName: "feedback_id", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
  // EventLogger table
  {
    TableName: TableName.EVENT_LOGGER,
    KeySchema: [{ AttributeName: "event_logger_id", KeyType: "HASH" }],
    AttributeDefinitions: [
      { AttributeName: "event_logger_id", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
];

// Create tables
const createTables = async (): Promise<void> => {
  for (const table of tables) {
    try {
      console.log(`Creating table: ${table.TableName}`);
      const result: CreateTableCommandOutput = await dynamoDBClient.send(
        new CreateTableCommand(table)
      );
      console.log(
        `Table created successfully: ${result.TableDescription?.TableName}\n`
      );
    } catch (error: any) {
      if (error.name === "ResourceInUseException") {
        console.log(`Table ${table.TableName} already exists.\n`);
      } else {
        console.error(`Error creating table ${table.TableName}:`, error);
      }
    }
  }
};

createTables();
