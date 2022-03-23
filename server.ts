import { ApolloServer, gql } from "apollo-server";
import { authors, books } from "./data/mock";

const typeDefs = gql`
  type Book {
    id: ID
    name: String
    genre: String
    author: Author
  }

  type Author {
    id: ID
    name: String
    age: Int
    books: [Book]
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    createAuthor(id: ID!, name: String, age: Int): Author
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args) => books.find((book) => `${book.id}` === args.id),
    authors: () => authors,
    author: (parent, args) =>
      authors.find((author) => `${author.id}` === args.id),
  },

  Mutation: {
    createAuthor: (parent, args) => args,
  },

  Book: {
    author: (parent) => authors.find((author) => author.id === parent.authorId),
  },

  Author: {
    books: (parent) => books.filter((book) => book.authorId === parent.id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen({ port: 8000 })
  .then(({ url }) => console.log(`Server ready at ${url}`));
