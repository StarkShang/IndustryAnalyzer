import { ConceptManager } from "./concepts";
import { TechnologyManager } from "./technology";

export interface DbManager {
    concept: ConceptManager;
    technology: TechnologyManager;
}

export * from "./concepts";
export * from "./technology";
