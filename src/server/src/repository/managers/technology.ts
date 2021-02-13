import { Connection, PageParam, TechnologyInput } from "@/models";
import { Op } from "sequelize";
import { TechnologyEntity } from "../models/technology";
import { parseTimeStampCursor } from "../utils/cursor";
import { DbManager } from "./manager";

export class TechnologyManager extends DbManager {
    public async create(input: TechnologyInput): Promise<TechnologyEntity> {
        return await TechnologyEntity.create(input);
    }

    public async update(id: number, input: Partial<TechnologyInput>) {
        return await TechnologyEntity.update(input, {
            where: { id }
        });
    }

    public async findById(id: number): Promise<TechnologyEntity | null> {
        return await TechnologyEntity.findOne({ where: { id } });
    }

    public async search(keyword: string, page: PageParam) {
        const { first, after } = page;
        const afterCursor = parseTimeStampCursor(after);

        const entities = await TechnologyEntity.findAll({
            where: {
                [Op.or]: {
                    name: {
                        [Op.like]: `%${keyword}%`
                    },
                    description: {
                        [Op.like]: `%${keyword}%`
                    }
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
