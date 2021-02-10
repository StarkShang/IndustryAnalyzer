import Vue from "vue";
import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// Install the vue plugin
Vue.use(VueApollo);

// 创建 apollo 客户端
export const apolloClient = new ApolloClient({
    link: createHttpLink({
        uri: "http://localhost:4000/graphql",
    }),
    cache: new InMemoryCache(),
})

export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});
