import { CommonMutationResult, ConceptInput, ConceptRelatedCorporationInfo, CreateRelatedCorporationInput, CreateRelatedTechnologyInput } from "@/models";
import { ConceptEntity, ConceptRelatedCorporationEntity, ConceptRelatedTechnologyEntity } from "../models/concept";
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

    public async createRelatedCorporation(input: CreateRelatedCorporationInput): Promise<ConceptRelatedCorporationEntity> {
        return await ConceptRelatedCorporationEntity.create(input);
    }

    public async createRelatedCorporations(input: CreateRelatedCorporationInput[]): Promise<ConceptRelatedCorporationEntity[]> {
        return await ConceptRelatedCorporationEntity.bulkCreate(input);
    }

    public async createRelatedTechnologies(input: CreateRelatedTechnologyInput[]): Promise<CommonMutationResult> {
        console.log(input);
        try {
            await ConceptRelatedTechnologyEntity.bulkCreate(input);
            return { success: true, message: "" };

        } catch (error) {
            console.error(error);
            return { success: false, message: "关联技术到概念失败" };
        }
    }

    public async updateRelatedCorporation(id: number, input: Partial<CreateRelatedCorporationInput>): Promise<ConceptRelatedCorporationInfo> {
        const result = await ConceptRelatedCorporationEntity.update(input, {
            where: { id }
        });
        console.log(result);
        return ConceptRelatedCorporationInfo.Empty;
    }
}
