export class CountryStatistic {
    public country = "";
    public number = 0;

    public static get Empty(): CountryStatistic {
        return new CountryStatistic();
    }
}
