export interface ConnectionEdge<T> {
    node: T;
    cursor: string;
}

export interface PageInfo {
    endCursor: string;
    hasNextPage: boolean;
}

export class Connection<T> {
    edges: ConnectionEdge<T>[] = [];
    pageInfo: PageInfo = {
        hasNextPage: false,
        endCursor: "",
    };
    totalCount = -1;

    public append(item: T): void {
        this.edges.push({
            node: item,
            cursor: "",
        });
    }

    public static unshiftNode<T>(connection: Connection<T>, item: T): Connection<T> {
        connection.edges.unshift({ node: item, cursor: "" });
        return connection;
    }

    public static unshiftNodes<T>(connection: Connection<T>, items: T[]): Connection<T> {
        connection.edges = items.map(item => ({ node: item, cursor: "" })).concat(connection.edges);
        return connection;
    }

    public get hasNextPage(): boolean {
        return this.pageInfo.hasNextPage;
    }

    public static appendPage<T>(
        origin: Connection<T>,
        next: Connection<T>
    ): Connection<T> {
        origin.edges = origin.edges.concat(next.edges);
        origin.pageInfo = next.pageInfo;
        origin.totalCount = next.totalCount;
        return origin;
    }

    public static resetPage<T>(
        origin: Connection<T>,
        next: Connection<T>
    ): Connection<T> {
        origin.edges = next.edges;
        origin.pageInfo = next.pageInfo;
        origin.totalCount = next.totalCount;
        return origin;
    }

    public static fromArray<T>(array: T[]): Connection<T> {
        const connection = new Connection<T>();
        connection.edges = array.map((item) => ({ node: item, cursor: "" }));
        connection.pageInfo = { hasNextPage: false, endCursor: "" };
        return connection;
    }
    public static get Empty(): Connection<any> {
        return new Connection<any>();
    }
    public static get Default(): Connection<any> {
        const connection = new Connection<any>();
        connection.pageInfo.hasNextPage = true;
        return connection;
    }
}
