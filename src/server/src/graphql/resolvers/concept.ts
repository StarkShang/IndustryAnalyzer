import { Concept, ConceptRelatedCorporationEntity, Connection, CreateOrUpdateConceptInput, CreateOrUpdateRelatedCorporationInput, CreateRelatedCorporationInput, CreateRelatedTechnologyInput, PageParam } from "@/models";
import { DbManager } from "@/repository/managers";
import { ConceptEntity } from "@/repository/models/concept";

export default {
    Query: {
        async concept(
            _: never,
            { id }: { id: number },
            { manager }: { manager: DbManager }
        ) {
            return await manager.concept.findById(id);
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
        async createConceptRelatedTechnologies(
            _: never,
            { input }: { input: CreateRelatedTechnologyInput[] },
            { manager }: { manager: DbManager }
        ) {
            return await manager.concept.createRelatedTechnologies(input);
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
        async technologies(
            concept: ConceptEntity,
            { pageParam }: { pageParam: PageParam },
            { manager }: { manager: DbManager }
        ) {
            const technologies = await manager.concept.getRelatedTechnologies(concept, pageParam);
            return technologies;
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
