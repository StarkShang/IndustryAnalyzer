import { addResolversToSchema } from "@graphql-tools/schema";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";

export default addResolversToSchema({
    schema: typeDefs,
    resolvers,
});
