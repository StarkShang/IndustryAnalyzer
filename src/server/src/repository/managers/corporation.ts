import { Op } from "sequelize";
import { Connection, Corporation, CreateCorporationInput, PageParam, UpdateCorporationInput } from "@/models";
import { CorporationEntity } from "../models/corporation";
import { parseTimeStampCursor } from "../utils/cursor";
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

    public async get(page: PageParam): Promise<Connection<CorporationEntity>> {
        const { first, after } = page;
        const afterCursor = parseTimeStampCursor(after);

        const entities = await CorporationEntity.findAll({
            where: {
                createdAt: {
                    [Op.lt]: afterCursor,
                }
            },
            order: [["createdAt", "DESC"]],
            limit: first + 1,
        });

        return Connection.fromArray(
            entities, page,
            (item: any) => item.createdAt.getTime().toString());
    }

    public async search(keyword: string, page: PageParam) {
        const { first, after } = page;
        const afterCursor = parseTimeStampCursor(after);

        const entities = await CorporationEntity.findAll({
            where: {
                name: {
                    [Op.like]: `%${keyword}%`
                },
                createdAt: {
                    [Op.lt]: afterCursor,
                }
            },
            order: [["createdAt", "DESC"]],
            limit: first + 1,
        });
        return Connection.fromArray(
            entities, page,
            (item: any) => item.createdAt.getTime().toString());
    }
}
