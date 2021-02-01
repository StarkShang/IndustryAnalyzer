import { Country } from "./country";

export class Corporation {
    public id = -1;
    public name = "";
    public country = Country.Empty;

    public static get Empty(): Corporation {
        return new Corporation();
    }
}

export class ConceptRelatedCorporationInfo {
    public id = -1;
    public corporation = Corporation.Empty;
    public description = "";

    public static get Empty(): ConceptRelatedCorporationInfo {
        return new ConceptRelatedCorporationInfo();
    }
}
