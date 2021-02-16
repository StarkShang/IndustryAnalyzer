import { Op } from "sequelize";
import { CommonMutationResult, ConceptInput, Connection, CorporationEntity, RelatedCorporationInput, PageParam } from "@/models";
import { ConceptEntity, ConceptRelatedCorporationEntity } from "../models/concept";
import { TechnologyEntity } from "../models/technology";
import { parseTimeStampCursor } from "../utils/cursor";
import { DbManager } from "./manager";

export class ConceptManager extends DbManager {
    public async create(concept: ConceptInput): Promise<ConceptEntity> {
        return await ConceptEntity.create(concept);
    }

    public async update(id: number, input: Partial<ConceptInput>): Promise<ConceptEntity>{
        const result = await ConceptEntity.update(input, {
            where: { id }
        });
        console.log(result);
        return ConceptEntity.build();
    }

    public async findById(id: number): Promise<ConceptEntity | null> {
        return ConceptEntity.findByPk(id);
    }

    public async createRelatedCorporation(
        concept: ConceptEntity,
        relation: RelatedCorporationInput
    ): Promise<CommonMutationResult> {
        try {
            const existed = await concept.hasRelatedCorporation(relation.corporationId);
            if (existed) {
                return { success: false, message: "企业已关联至概念" };
            } else {
                await concept.createRelatedCorporation({
                    description: relation.description,
                    corporationId: relation.corporationId
                });
                return { success: true, message: "" }
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: "关联企业到概念失败" };
        }
    }

    public async createRelatedCorporations(
        concept: ConceptEntity,
        relations: RelatedCorporationInput[]
    ): Promise<CommonMutationResult> {
        const t = await concept.sequelize.transaction();
        try {
            const input = relations.map(relation => ({
                ...relation,
                conceptId: concept.id
            }));
            await ConceptRelatedCorporationEntity.bulkCreate(input);
            return { success: true, message: "" };
        } catch (error) {
            console.error(error);
            return { success: false, message: "关联企业到概念失败" };
        }
    }

    public async createRelatedTechnologies(concept: ConceptEntity, technologyIds: number[]): Promise<CommonMutationResult> {
        try {
            await concept.addTechnologies(technologyIds);
            // await ConceptRelatedTechnologyEntity.bulkCreate(input);
            return { success: true, message: "" };

        } catch (error) {
            console.error(error);
            return { success: false, message: "关联技术到概念失败" };
        }
    }

    public async getRelatedTechnologies(concept: ConceptEntity, page: PageParam): Promise<TechnologyEntity[]> {
        const { first, after } = page;
        const afterCursor = parseTimeStampCursor(after);
        try {
            return await concept.getTechnologies({
                where: {
                    createdAt: {
                        [Op.lt]: afterCursor,
                    }
                },
                order: [["createdAt", "DESC"]],
                limit: first + 1
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    public async getRelatedCorporations(concept: ConceptEntity, page: PageParam): Promise<ConceptRelatedCorporationEntity[]> {
        const { first, after } = page;
        const afterCursor = parseTimeStampCursor(after);

        try {
            return await concept.getRelatedCorporations({
                where: {
                    createdAt: {
                        [Op.lt]: afterCursor
                    }
                },
                order: [["createdAt", "DESC"]],
                limit: first + 1,

            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
