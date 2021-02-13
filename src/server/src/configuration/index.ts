import { promises as fs} from "fs";
import path from "path";
import YAML from "yaml";

interface ApplicationConfigurationSection {
    port: number;
}

interface DatabaseConfigurationSection {
    filename: string;
}
export interface AppConfiguration {
    application: ApplicationConfigurationSection;
    database: DatabaseConfigurationSection;
}

export default async function(): Promise<AppConfiguration> {
    const configFileName = path.join(__dirname, (process.env.NODE_ENV || "development") + ".yaml");
    const file = await fs.readFile(configFileName, { encoding: "utf8" });
    return YAML.parse(file);
}
