import { Op } from "sequelize";
import { CommonMutationResult, ConceptInput, ConceptRelatedCorporationInfo, Connection, CreateRelatedCorporationInput, CreateRelatedTechnologyInput, PageParam } from "@/models";
import { ConceptEntity, ConceptRelatedCorporationEntity, ConceptRelatedTechnologyEntity } from "../models/concept";
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

    public async createRelatedCorporation(input: CreateRelatedCorporationInput): Promise<ConceptRelatedCorporationEntity> {
        return await ConceptRelatedCorporationEntity.create(input);
    }

    public async createRelatedCorporations(input: CreateRelatedCorporationInput[]): Promise<ConceptRelatedCorporationEntity[]> {
        return await ConceptRelatedCorporationEntity.bulkCreate(input);
    }

    public async updateRelatedCorporation(id: number, input: Partial<CreateRelatedCorporationInput>): Promise<ConceptRelatedCorporationInfo> {
        const result = await ConceptRelatedCorporationEntity.update(input, {
            where: { id }
        });
        console.log(result);
        return ConceptRelatedCorporationInfo.Empty;
    }

    public async createRelatedTechnologies(input: CreateRelatedTechnologyInput[]): Promise<CommonMutationResult> {
        try {
            await ConceptRelatedTechnologyEntity.bulkCreate(input);
            return { success: true, message: "" };

        } catch (error) {
            console.error(error);
            return { success: false, message: "关联技术到概念失败" };
        }
    }

    public async getRelatedTechnologies(concept: ConceptEntity, page: PageParam): Promise<Connection<TechnologyEntity>> {
        const { first, after } = page;
        const afterCursor = parseTimeStampCursor(after);
        try {
            const technologies = await concept.getTechnologies({
                where: {
                    createdAt: {
                        [Op.lt]: afterCursor,
                    }
                },
                order: [["createdAt", "DESC"]],
                limit: first + 1
            });
            return Connection.fromArray(
                technologies, page,
                (item: any) => item.createdAt.getTime().toString());
        } catch (error) {
            console.error(error);
            return Connection.Empty;
        }
    }
}
