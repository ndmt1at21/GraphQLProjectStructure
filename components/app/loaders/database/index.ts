import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { configs } from "../config";

let clientConnection: DynamoDBClient;

export const getClientConnection = () => {
  return clientConnection;
};

export const connectDatabase = (): DynamoDBClient => {
  clientConnection = new DynamoDBClient({
    region: configs.AWS_DEFAULT_REGION,
    credentials: {
      accessKeyId: configs.AWS_ACCESS_KEY,
      secretAccessKey: configs.AWS_SECRET_KEY,
    },
  });

  return clientConnection;
};
