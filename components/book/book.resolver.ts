import { AuthorRepository } from "../author/author.repository";
import { BookRepository } from "./book.repository";

export const bookResolvers = {
  Query: {
    books: async (parent, args, ctx) => {
      const bookRepo = ctx.bookRepository as BookRepository;
      return await bookRepo.findAllBooks();
    },

    book: async (parent, args, ctx) => {
      const bookRepo = ctx.bookRepository as BookRepository;
      return await bookRepo.findBookById(args.id);
    },
  },

  Mutation: {
    createBook: async (parent, args, ctx) => {
      const bookRepo = ctx.bookRepository as BookRepository;
      return await bookRepo.createBook(args.book);
    },

    updateBook: async (parent, args, ctx) => {
      const bookRepo = ctx.bookRepository as BookRepository;
      return await bookRepo.updateBook(args.id, args.book);
    },
  },

  Book: {
    author: async (parent, args, ctx) => {
      const authorRepo = ctx.authorRepository as AuthorRepository;
      return await authorRepo.findAuthorById(parent.authorId);
    },
  },
};
