import { Patent } from "@/models";

export default {
    Query: {
        async patent() {
            return Patent.Empty;
        }
    },
};
