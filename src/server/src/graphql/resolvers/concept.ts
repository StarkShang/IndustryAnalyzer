import { Concept, Connection, CreateConceptInput, PageParam } from "@/models";
import { DbManager } from "@/repository/managers";

export default {
    Query: {
        async concept() {
            return Concept.Empty;
        }
    },
    Mutation: {
        async createConcept(_: never, { input }: { input: CreateConceptInput }, { manager }: { manager: DbManager }) {
            const concept = await manager.concept.create(input);
            return concept.toJSON();
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
