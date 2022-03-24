import { Repository } from "../base/Repository";
import { Book } from "./book.model";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  ScanCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 } from "uuid";

export class BookRepository extends Repository {
  TABLE_NAME = "book";

  async findBookById(id: string): Promise<Book | undefined> {
    const result = await this.docClient.send(
      new GetCommand({
        TableName: this.TABLE_NAME,
        Key: {
          id,
        },
      })
    );

    return result.Item as Book;
  }

  async findAllBooks(): Promise<Book[]> {
    const result = await this.docClient.send(
      new ScanCommand({
        TableName: this.TABLE_NAME,
      })
    );

    return result.Items.map((item) => item as unknown as Book);
  }

  async findAllBookByAuthorId(authorId: string): Promise<Book[]> {
    const result = await this.docClient.send(
      new QueryCommand({
        TableName: this.TABLE_NAME,
        KeyConditionExpression: "#authorId = :authorId",
        ExpressionAttributeNames: {
          "#authorId": "authorId",
        },
        ExpressionAttributeValues: {
          ":authorId": authorId,
        },
      })
    );

    return result.Items as Book[];
  }

  async deleteBookById(id: string): Promise<void> {
    await this.docClient.send(
      new DeleteCommand({
        TableName: this.TABLE_NAME,
        Key: {
          id,
        },
      })
    );
  }

  async createBook(book: Book): Promise<Book> {
    const id = v4();

    const {
      updateExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    } = this.createUpdateExpressions({ ...book });

    const createdBook = await this.docClient.send(
      new UpdateCommand({
        TableName: this.TABLE_NAME,
        Key: { id },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
      })
    );

    return createdBook.Attributes as Book;
  }

  async updateBook(id: string, book: Partial<Book>): Promise<Book> {
    const {
      updateExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    } = this.createUpdateExpressions(book);

    const updatedBook = await this.docClient.send(
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

    return updatedBook.Attributes as Book;
  }
}
