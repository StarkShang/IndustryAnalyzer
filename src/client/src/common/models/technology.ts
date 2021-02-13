import { Connection } from "./connection";
import { Corporation } from "./corporation";
import { News } from "./news";
import { Patent } from "./patent";

export class TechnologyRelatedCorporationInfo {
    public id = -1;
    public corporation = Corporation.Empty;
    public description = "";

    public static get Empty(): TechnologyRelatedCorporationInfo {
        return new TechnologyRelatedCorporationInfo();
    }
}

export class Technology {
    public id = -1;
    public name = "";
    public description = "";
    public news: Connection<News> = Connection.Default;
    public corporations: Connection<TechnologyRelatedCorporationInfo> = Connection.Default;
    public patents: Connection<Patent> = Connection.Default;

    public static get Empty(): Technology {
        return new Technology();
    }
}

export interface CreateTechnologyInput {
    name: string;
    description: string;
}
