import { Country } from "./country";

export class Corporation {
    public id = -1;
    public name = "";
    public country = Country.Empty;

    public static get Empty(): Corporation {
        return new Corporation();
    }
}

export interface CreateOrUpdateCorporationInput {
    id?: number;
    name: string;
    country: string;
}

export interface CreateCorporationInput {
    name: string;
    country: string;
}

export interface UpdateCorporationInput {
    id: number;
    name: string;
    country: string;
}

export interface CorporationEntity {
    id: number;
    name: string;
    country: string;
}
