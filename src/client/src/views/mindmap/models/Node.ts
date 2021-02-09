import { IMindmapNode } from "@attonex-private/mindmap";

export interface NodeInfo {
    key?: string;
    name?: string;
    template: string;
    data: any;
}

export interface MindmapNode extends IMindmapNode {
    infos?: NodeInfo | NodeInfo[];
}
