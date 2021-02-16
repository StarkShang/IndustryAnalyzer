import { CommonMutationResult, Concept, ConceptRelatedCorporationEntity, ConceptRelatedCorporationInfo, Connection, CreateOrUpdateConceptInput, RelatedCorporationInput, PageParam } from "@/models";
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
        async createConceptRelatedCorporation(
            _: never,
            { conceptId, relation }: { conceptId: number, relation: RelatedCorporationInput },
            { manager }: { manager: DbManager }
        ): Promise<CommonMutationResult> {
            const concept = await manager.concept.findById(conceptId);
            if (concept) {
                return await manager.concept.createRelatedCorporation(concept, relation);
            } else {
                return { success: false, message: "找不到对应概念" };
            }
        },
        async createConceptRelatedCorporations(
            _: never,
            { conceptId, relations }: { conceptId: number, relations: RelatedCorporationInput[] },
            { manager }: { manager: DbManager }
        ): Promise<CommonMutationResult> {
            const concept = await manager.concept.findById(conceptId);
            if (concept) {
                return await manager.concept.createRelatedCorporations(concept, relations);
            } else {
                return { success: false, message: "找不到对应概念" };
            }
        },
        async createConceptRelatedTechnologies(
            _: never,
            { conceptId, technologyIds }: { conceptId: number, technologyIds: number[] },
            { manager }: { manager: DbManager }
        ): Promise<CommonMutationResult> {
            const concept = await manager.concept.findById(conceptId);
            if (concept) {
                return await manager.concept.createRelatedTechnologies(concept, technologyIds);
            } else {
                return {
                    success: false,
                    message: "找不到对应概念"
                };
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
            return Connection.fromArray(
                technologies, pageParam,
                (item: any) => item.createdAt.getTime().toString());
        },
        async corporations(
            concept: ConceptEntity,
            { pageParam }: { pageParam: PageParam },
            { manager }: { manager: DbManager }
        ) {
            const corporations = await manager.concept.getRelatedCorporations(concept, pageParam);
            return Connection.fromArray(
                corporations, pageParam,
                (item: any) => item.createdAt.getTime().toString());
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
