import { Country } from "@/models";
import { countries } from "../data/country";

export class CountryManager {
    private countries: Record<string, Country> = {};

    public getByCode(code: string): Country | undefined {
        return this.countries[code.toUpperCase()];
    }

    public constructor() {
        countries.forEach(country => {
            this.countries[country.code] = country as Country;
        });
    }
}
