import { getClientConnection } from "../app/loaders/database";
import { AuthorRepository } from "./author.repository";

export function createAuthorRepository() {
  return new AuthorRepository(getClientConnection());
}
