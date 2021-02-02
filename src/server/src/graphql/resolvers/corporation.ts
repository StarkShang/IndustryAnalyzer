import { Corporation } from "@/models";

export default {
    Query: {
        async corporation() {
            return Corporation.Empty;
        }
    },
};
