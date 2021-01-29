export class NewsLink {
    public id = -1;
    public url = "";
    public source = "";
}

export class News {
    public id = -1;
    public title = "";
    public content = "";
    public date: string | Date = new Date();
    public links: NewsLink[] = [];

    public static get Empty(): News {
        return new News();
    }
}
