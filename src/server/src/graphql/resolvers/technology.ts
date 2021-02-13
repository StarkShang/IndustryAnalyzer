import { Connection, CreateOrUpdateTechnologyInput, PageParam, Technology } from "@/models";
import { DbManager } from "@/repository";

export default {
    Query: {
        async technology(
            _: never,
            { id }: { id: number },
            { manager }: { manager: DbManager }
        ) {
            return await manager.technology.findById(id);
        },
        async searchTechnology(
            _: never,
            { keyword, pageParam }: { keyword: string, pageParam: PageParam },
            { manager }: { manager: DbManager }
        ) {
            return await manager.technology.search(keyword, pageParam);
        }
    },
    Mutation: {
        async createOrUpdateTechnology(
            _: never,
            { input }: { input: CreateOrUpdateTechnologyInput },
            { manager }: { manager: DbManager }
        ) {
            if (input.id) {
                return await manager.technology.update(input.id, input);
            } else {
                return await manager.technology.create(input);
            }
        }
    },
    Technology: {
        async news(technology: Technology, { pageParam }: { pageParam: PageParam }, { }) {
            return Connection.Empty;
        },
        async corporations(technology: Technology, { pageParam }: { pageParam: PageParam }, { }) {
            return Connection.Empty;
        },
        async patents(technology: Technology, { pageParam }: { pageParam: PageParam }, { }) {
            return Connection.Empty;
        }
    }
};
