import { loadSchemaSync } from "@graphql-tools/load";
import { gql } from "apollo-server";
import { print } from "graphql";
const { mergeTypeDefs } = require("@graphql-tools/merge");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
import * as path from "path";

export const loadSchemas = () => {
  const allTypeDefs = loadSchemaSync(
    [
      path.resolve("components/author/author.schema.graphql"),
      path.resolve("components/book/book.schema.graphql"),
    ],
    {
      loaders: [new GraphQLFileLoader()],
    }
  );

  const typeDefs = mergeTypeDefs(allTypeDefs);
  return gql(print(typeDefs));
};
