import { Connection } from "./connection";
import { Corporation } from "./corporation";
import { Technology } from "./technology";

export class ConceptRelatedCorporationInfo {
    public id = -1;

    public constructor(
        public description = "",
        public corporation = Corporation.Empty) { }

    public static get Empty(): ConceptRelatedCorporationInfo {
        return new ConceptRelatedCorporationInfo();
    }
}

export class Concept {
    public id = -1;
    public name = "";
    public description = "";
    public industryChain = "";
    public competitors: Connection<Concept> = Connection.Default;
    public technologies: Connection<Technology> = Connection.Default;
    public corporations: Connection<ConceptRelatedCorporationInfo> = Connection.Default;

    public static get Empty(): Concept {
        return new Concept();
    }
}

export interface CreateConceptRelatedCorporationInput {
    conceptId: number;
    corporationId: number;
    description: string;
}
