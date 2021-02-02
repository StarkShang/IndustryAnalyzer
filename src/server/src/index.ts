import koa from "koa"; // koa@2
import { ApolloServer } from "apollo-server-koa";
import schema from "./graphql";
import db from "./repository";

console.log(db);

// const server = new ApolloServer({ schema });
// const app = new koa();
// app.use(server.getMiddleware());
// app.listen({ port: 4000 }, () =>
//     console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
// );
