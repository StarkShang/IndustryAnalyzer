import { Corporation, CreateCorporationInput, UpdateCorporationInput } from "@/models";
import { CorporationEntity } from "../models/corporation";
import { DbManager } from "./manager";

export class CorporationManager extends DbManager {
    public async create(input: CreateCorporationInput): Promise<Corporation> {
        const result = await CorporationEntity.create(input);
        return result.toJSON() as Corporation;
    }

    public async update(id: number, input: Partial<CreateCorporationInput>): Promise<Corporation> {
        const result = await CorporationEntity.update(input, {
            where: { id }
        });
        console.log(result);
        return Corporation.Empty;
    }

    public async findById(id: number): Promise<Corporation> {
        const entity = await CorporationEntity.findOne({ where: { id }});
        if (entity) {
            return entity.toJSON() as Corporation;
        } else {
            throw new Error();
        }
    }
}
