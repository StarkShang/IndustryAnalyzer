import path from "path";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

const typeDefs = loadSchemaSync(path.join(__dirname, "./**/*.graphql"), {
    recursive: true,
    loaders: [
        new GraphQLFileLoader()
    ]
});

export default typeDefs;
