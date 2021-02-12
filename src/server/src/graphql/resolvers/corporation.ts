import { Corporation, CorporationEntity, CreateOrUpdateCorporationInput } from "@/models";
import { DbManager } from "@/repository";

export default {
    Corporation: {
        async country(
            corporation: CorporationEntity,
            _: never,
            { manager }: { manager: DbManager })
        {
            return manager.country.getByCode(corporation.country);
        }
    },
    Query: {
        async corporation(
            _: never,
            { id }: { id: number },
            { manager }: { manager: DbManager }):
            Promise<Corporation | null>
        {
            return await manager.corporation.findById(id);
        }
    },
    Mutation: {
        async createOrUpdateCorporation(_: never,
            { input }: { input: CreateOrUpdateCorporationInput },
            { manager }: { manager: DbManager }):
            Promise<Corporation>
        {
            if (input.id) {
                return await manager.corporation.update(input.id, input);
            } else {
                return await manager.corporation.create(input);
            }
        }
    }
};
