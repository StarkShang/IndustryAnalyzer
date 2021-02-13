import { Concept, ConceptRelatedCorporationEntity, Connection, CreateOrUpdateConceptInput, CreateOrUpdateRelatedCorporationInput, CreateRelatedCorporationInput, PageParam } from "@/models";
import { DbManager } from "@/repository/managers";

export default {
    Query: {
        async concept() {
            return Concept.Empty;
        }
    },
    Mutation: {
        async createOrUpdateConcept(
            _: never,
            { input }: { input: CreateOrUpdateConceptInput },
            { manager }: { manager: DbManager }
        ) {
            if (input.id) {
                return await manager.concept.update(input.id, input);
            } else {
                return await manager.concept.create(input);
            }
        },
        async createConceptRelatedCorporations(
            _: never,
            { input }: { input: CreateRelatedCorporationInput[] },
            { manager }: { manager: DbManager }
        ) {
            return await manager.concept.createRelatedCorporations(input);
        },
        async createOrUpdateConceptRelatedCorporation(
            _: never,
            { input }: { input: CreateOrUpdateRelatedCorporationInput },
            { manager }: { manager: DbManager }
        ) {
            if (input.id) {
                return await manager.concept.updateRelatedCorporation(input.id, input);
            } else {
                return await manager.concept.createRelatedCorporation(input);
            }
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
    },
    ConceptRelatedCorporation: {
        async corporation(
            entity: ConceptRelatedCorporationEntity,
            _: never,
            { manager }: { manager: DbManager }
        ) {
            return await manager.corporation.findById(entity.corporationId);
        }
    }
};
