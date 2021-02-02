import { News } from "@/models";

export default {
    Query: {
        async news() {
            return News.Empty;
        }
    },
};
