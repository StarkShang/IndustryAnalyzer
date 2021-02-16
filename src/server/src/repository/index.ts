import path from "path";
import fs from "fs";
import { Sequelize } from "sequelize";
import { AppConfiguration } from "@/configuration";
import { ConceptManager, CorporationManager, CountryManager, DbManager, TechnologyManager } from "./managers";

export { DbManager } from "./managers";

export default async (configuration: AppConfiguration): Promise<DbManager> => {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: configuration.database.filename,
        logging: console.log
    });

    const resolve = (dir: string) => path.join(__dirname, "models", dir);
    const modelFileNames = fs.readdirSync(resolve("."));
    modelFileNames.forEach(async filename => {
        const { init } = await import(resolve(filename));
        if (init) { init(sequelize); }
    });
    modelFileNames.forEach(async filename => {
        const { associate } = await import(resolve(filename));
        if (associate) { associate(); }
    });
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
