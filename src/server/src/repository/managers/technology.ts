import { Technology } from "../models/technology";
import { DbManager } from "./manager";

export class TechnologyManager extends DbManager {
    public async create(concept: Technology): Promise<Technology> {
        return await Technology.create(concept);
    }
}
