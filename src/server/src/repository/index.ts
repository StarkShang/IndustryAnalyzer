import path from "path";
import fs from "fs";
import { Sequelize } from "sequelize";
import { AppConfiguration } from "@/configuration";
import { ConceptManager, CorporationManager, CountryManager, DbManager, TechnologyManager } from "./managers";

export { DbManager } from "./managers";

export async function buildEntities(sequelize: Sequelize) {
    const resolve = (dir: string) => path.join(__dirname, "models", dir);
    const modelFileNames = fs.readdirSync(resolve("."));

    for (const filename of modelFileNames) {
        const { init } = await import(resolve(filename));
        if (init) { init(sequelize); }
    }
    for (const filename of modelFileNames) {
        const { associate } = await import(resolve(filename));
        if (associate) { associate(); }
    }
}

export default async (configuration: AppConfiguration): Promise<DbManager> => {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: configuration.database.filename,
        logging: console.log
    });

    await buildEntities(sequelize);
    if (process.env.NODE_ENV !== "production") {
        await sequelize.sync({ force: true });
    }

    //
    return {
        country: new CountryManager(),
        concept: new ConceptManager(sequelize),
        corporation: new CorporationManager(sequelize),
        technology: new TechnologyManager(sequelize),
    }
}
