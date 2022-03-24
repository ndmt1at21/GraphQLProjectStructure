import { authorResolvers } from "../../../author/author.resolver";
import { bookResolvers } from "../../../book/book.resolver";
import { mergeResolvers } from "@graphql-tools/merge";

export const loadResolvers = () => {
  const mergedResolvers = mergeResolvers([authorResolvers, bookResolvers]);
  return mergedResolvers;
};
