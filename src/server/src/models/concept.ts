import { Connection } from "./connection";
import { Corporation } from "./corporation";
import { Technology } from "./technology";

export interface CreateOrUpdateConceptInput {
    id?: number;
    name: string;
    description: string;
}

export interface ConceptInput {
    name: string;
    description: string;
}

export interface CreateOrUpdateRelatedCorporationInput {
    id?: number;
    description: string;
    conceptId: number;
    corporationId: number;
}

export interface CreateRelatedCorporationInput {
    description: string;
    conceptId: number;
    corporationId: number;
}

export interface CreateRelatedTechnologyInput {
    conceptId: number;
    technologyId: number;
}

export interface UpdateRelatedCorporationInput {
    id: number;
    description: string;
    conceptId: number;
    corporationId: number;
}

export class ConceptRelatedCorporationInfo {
    public id = -1;
    public description = "";
    public corporation = Corporation.Empty;

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

export interface ConceptRelatedCorporationEntity {
    id: number;
    description: string;
    corporationId: number;
}
