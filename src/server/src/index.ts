import koa from "koa"; // koa@2
import { ApolloServer } from "apollo-server-koa";
import schema from "./graphql";
import initConfiguration from "./configuration";
import initDatabase from "./repository";

async function main() {
    const config = await initConfiguration();
    const manager = await initDatabase(config);
    const server = new ApolloServer({
        schema,
        context: {
            manager
        }
    });
    new koa()
        .use(server.getMiddleware())
        .listen({ port: config.application.port }, () =>
        console.log(`🚀 Server ready at http://localhost:${config.application.port}${server.graphqlPath}`),
    );
}

main().then();
