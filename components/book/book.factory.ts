import { getClientConnection } from "../app/loaders/database";
import { BookRepository } from "./book.repository";

export function createBookRepository() {
  return new BookRepository(getClientConnection());
}
