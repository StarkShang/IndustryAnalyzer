export class Country {
    public name = "";
    public en = "";
    public code = "";

    public static get Empty(): Country {
        return new Country();
    }
}

export class CountryStatistic {
    public country = "";
    public number = 0;

    public static get Empty(): CountryStatistic {
        return new CountryStatistic();
    }
}
