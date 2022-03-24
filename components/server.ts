import { ApolloServer } from "apollo-server";
import { loadSchemas } from "./app/loaders/schemas";
import { loadResolvers } from "./app/loaders/resolvers";
import { connectDatabase } from "./app/loaders/database";
import { createBookRepository } from "./book/book.factory";
import { createAuthorRepository } from "./author/author.factory";

connectDatabase();

const bookRepo = createBookRepository();
const authorRepo = createAuthorRepository();

const server = new ApolloServer({
  typeDefs: loadSchemas(),
  resolvers: loadResolvers(),
  context: { bookRepository: bookRepo, authorRepository: authorRepo },
});

server
  .listen({ port: 8000 })
  .then(() => console.log("Server is listening on port 8000"))
  .catch((err) => console.log(err));
