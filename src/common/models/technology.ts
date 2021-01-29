import { Connection } from "./connection";
import { Corporation } from "./corporation";
import { News } from "./news";

export class TechnologyRelatedCorporationInfo {
    public id = -1;
    public corporation = Corporation.Empty;
}

export class Technology {
    public id = -1;
    public name = "";
    public description = "";
    public news: Connection<News> = Connection.Default;
    public corporations: Connection<TechnologyRelatedCorporationInfo> = Connection.Default;

    public static get Empty(): Technology {
        return new Technology();
    }
}
