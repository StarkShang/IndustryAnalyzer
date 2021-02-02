import path from "path";
import fs from "fs";
import { Sequelize } from "sequelize";

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

export default sequelize;
