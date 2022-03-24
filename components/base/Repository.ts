import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export class Repository {
  client: DynamoDBClient;
  docClient: DynamoDBDocumentClient;

  constructor(client: DynamoDBClient) {
    this.client = client;
    this.docClient = DynamoDBDocumentClient.from(client);
  }

  createUpdateExpressions(item: { [key: string]: any }) {
    const updateExpression: string[] = [];
    const expressionAttributeNames: { [key: string]: any } = {};
    const expressionAttributeValues: { [key: string]: any } = {};

    Object.keys(item).map((key) => {
      const keyAlias = `#k${key}`;
      const valuePlaceholder = `:v${key}`;

      updateExpression.push(`${keyAlias} = ${valuePlaceholder}`);
      expressionAttributeNames[keyAlias] = key;
      expressionAttributeValues[valuePlaceholder] = item[key];
    });

    return {
      updateExpression: `set ${updateExpression.join(", ")}`,
      expressionAttributeNames,
      expressionAttributeValues,
    };
  }
}
