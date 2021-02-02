import koa from "koa"; // koa@2
import { ApolloServer } from "apollo-server-koa";
import schema from "./graphql";
import initDatabase from "./repository";

initDatabase().then(manager => {
    const server = new ApolloServer({
        schema,
        context: {
            manager
        }
    });
    const app = new koa();
    app.use(server.getMiddleware());
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
    );
});
