import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./index.typeDefs";
import { resolvers } from "./index.resolvers";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
// src/graphql/graphql.router.ts
import { Router } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import bodyParser from "body-parser";
import graphqlContext from "../middlewares/graphqlContext";
 

const graphqlRouter = Router();

const server = new ApolloServer({
  schema,
  introspection: process.env.NODE_ENV !== "production",
});

(async function startApolloServer() {
  try {
    await server.start();

    graphqlRouter.use(
      "/graphql",
      cors(),
      bodyParser.json(),
      expressMiddleware(server, {
        context:  graphqlContext
      }),
    );

    console.log("🚀 Apollo GraphQL Server is running at /graphql");
  } catch (error) {
    console.error("❌ Failed to start Apollo Server:", error);
  }
})();

export default graphqlRouter;
