import { BookRepository } from "../book/book.repository";
import { AuthorRepository } from "./author.repository";

export const authorResolvers = {
  Query: {
    authors: async (parent, args, ctx) => {
      const authorRepo = ctx.authorRepository as AuthorRepository;
      return await authorRepo.findAllAuthors();
    },

    author: async (parent, args, ctx) => {
      const authorRepo = ctx.authorRepository as AuthorRepository;
      return await authorRepo.findAuthorById(args.id);
    },
  },

  Mutation: {
    createAuthor: async (parent, args, ctx) => {
      const authorRepo = ctx.authorRepository as AuthorRepository;
      return await authorRepo.createAuthor(args.author);
    },

    updateAuthor: async (parent, args, ctx) => {
      const authorRepo = ctx.authorRepository as AuthorRepository;
      return await authorRepo.updateAuthor(args.id, args.author);
    },
  },

  Author: {
    books: async (parent, args, ctx) => {
      const bookRepository = ctx.bookRepository as BookRepository;
      return await bookRepository.findAllBookByAuthorId(parent.id);
    },
  },
};
