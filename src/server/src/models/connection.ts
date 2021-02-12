import { assertDirective } from "graphql";
import { PageParam } from "./common";

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

    public static fromArray<T>(
        array: T[],
        page?: PageParam,
        cursorGen?: (item: T) => string)
        : Connection<T>
    {
        const connection = new Connection<T>();
        const hasNextPage = page ? array.length > page.first : false;
        const pageLength = page ? Math.min(page.first, array.length) : array.length;
        connection.edges = array.slice(0, pageLength).map((item) => ({
            node: item,
            cursor: cursorGen ? getCursor(cursorGen(item)) : ""
        }));
        connection.pageInfo = {
            hasNextPage,
            endCursor: pageLength ? connection.edges[pageLength - 1].cursor : ""
        };
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

export function getCursor(cursorString: string): string {
    return Buffer.from(cursorString).toString("base64");
}
