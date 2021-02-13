import { ConceptInput, ConceptRelatedCorporationInfo, CreateRelatedCorporationInput } from "@/models";
import { ConceptEntity, ConceptRelatedCorporationEntity } from "../models/concept";
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

    public async updateRelatedCorporation(id: number, input: Partial<CreateRelatedCorporationInput>): Promise<ConceptRelatedCorporationInfo> {
        const result = await ConceptRelatedCorporationEntity.update(input, {
            where: { id }
        });
        console.log(result);
        return ConceptRelatedCorporationInfo.Empty;
    }
}
