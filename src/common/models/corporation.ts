export class Corporation {
    public id = -1;

    public static get Empty(): Corporation {
        return new Corporation();
    }
}
