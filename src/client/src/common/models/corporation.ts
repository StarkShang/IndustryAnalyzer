import { Country } from "./country";

export class EditCorporationInput {
    public id?: number;
    public name = "";
    public country: Country | null = null;

    public static get Empty(): EditCorporationInput {
        return new EditCorporationInput();
    }
}

export interface CreateOrUpdateCorporationInput {
    id?: number;
    name: string;
    country: string;
}

export class Corporation {
    public id = -1;
    public name = "";
    public country = Country.Empty;

    public static get Empty(): Corporation {
        return new Corporation();
    }
}
