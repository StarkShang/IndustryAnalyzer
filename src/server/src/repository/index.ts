import path from "path";
import fs from "fs";
import { Sequelize } from "sequelize";
import { ConceptManager, CorporationManager, CountryManager, DbManager, TechnologyManager } from "./managers";

export { DbManager } from "./managers";

export default async (): Promise<DbManager> => {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "./database.sqlite",
        logging: console.log
    });

    const resolve = (dir: string) => path.join(__dirname, "models", dir);
    const modelFileNames = fs.readdirSync(resolve("."));
    modelFileNames.forEach(async filname => {
        const { init } = await import(resolve(filname));
        if (init) { init(sequelize); }
    });
    modelFileNames.forEach(async filname => {
        const { associate } = await import(resolve(filname));
        if (associate) { associate(); }
    });
    if (process.env.NODE_ENV === "development") {
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
