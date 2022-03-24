import { Repository } from "../base/Repository";
import { Author } from "./author.model";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 } from "uuid";

export class AuthorRepository extends Repository {
  TABLE_NAME = "author";

  async findAuthorById(id: string): Promise<Author | undefined> {
    const result = await this.docClient.send(
      new GetCommand({
        TableName: this.TABLE_NAME,
        Key: {
          id,
        },
      })
    );

    return result.Item as Author;
  }

  async findAllAuthors(): Promise<Author[]> {
    const result = await this.docClient.send(
      new ScanCommand({
        TableName: this.TABLE_NAME,
      })
    );

    return result.Items.map((item) => item as unknown as Author);
  }

  async deleteAuthorById(id: string): Promise<void> {
    await this.docClient.send(
      new DeleteCommand({
        TableName: this.TABLE_NAME,
        Key: {
          id,
        },
      })
    );
  }

  async createAuthor(author: Author): Promise<Author> {
    const id = v4();

    const {
      updateExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    } = this.createUpdateExpressions({ ...author });

    const createdAuthor = await this.docClient.send(
      new UpdateCommand({
        TableName: this.TABLE_NAME,
        Key: { id },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
      })
    );

    return createdAuthor.Attributes as Author;
  }

  async updateAuthor(id: string, author: Partial<Author>): Promise<Author> {
    const {
      updateExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    } = this.createUpdateExpressions(author);

    const updatedAuthor = await this.docClient.send(
      new UpdateCommand({
        TableName: this.TABLE_NAME,
        Key: {
          id,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
      })
    );

    return updatedAuthor.Attributes as Author;
  }
}
