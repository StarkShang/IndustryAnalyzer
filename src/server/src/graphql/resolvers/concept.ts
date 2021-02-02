import { Concept, Connection, PageParam } from "@/models";

export default {
    Query: {
        async concept() {
            return Concept.Empty;
        }
    },
    Concept: {
        async competitors(concept: Concept, { pageParam }: { pageParam: PageParam }, { }) {
            return Connection.Default;
        },
        async technologies(concept: Concept, { pageParam }: { pageParam: PageParam }, { }) {
            return Connection.Default;
        },
        async corporations(concept: Concept, { pageParam }: { pageParam: PageParam }, { }) {
            return Connection.Default;
        }
    }
};
