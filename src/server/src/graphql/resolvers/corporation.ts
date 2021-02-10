import { Corporation, CreateOrUpdateCorporationInput } from "@/models";

export default {
    Query: {
        async corporation() {
            return Corporation.Empty;
        }
    },
    Mutation: {
        async createOrUpdateCorporation(_: never, { input }: { input: CreateOrUpdateCorporationInput }) {
            console.log(input);
        }
    }
};
