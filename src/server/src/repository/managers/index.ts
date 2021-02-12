import { ConceptManager } from "./concept";
import { CorporationManager } from "./corporation";
import { CountryManager } from "./country";
import { TechnologyManager } from "./technology";

export interface DbManager {
    country: CountryManager;
    corporation: CorporationManager;
    concept: ConceptManager;
    technology: TechnologyManager;
}

export * from "./country";
export * from "./corporation";
export * from "./concept";
export * from "./technology";
