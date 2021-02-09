<template>
    <div id="mindmap">
        <node-detail-panel class="node-detail-panel"
            :node="selectedNode">
        </node-detail-panel>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Mindmap, IMindmapNodeData, IMindmapNode } from "@attonex-private/mindmap";
import { createMindmapOption } from "./utils/configuration";
import NodeDetailPanel from "./components/NodeDetailPanel.vue";
import { MindmapNode } from "./models/Node";
import { INode } from "@antv/g6/lib/interface/item";

@Component({
    name: "MindmapPage",
    components: {
        NodeDetailPanel
    }
})
export default class MindmapPage extends Vue {
    public mindmap: Mindmap!;
    public selectedNode: MindmapNode | null = null;

    public mounted(): void {
        this.initMindmap();
        this.initMindmapData();
    }

    private async initMindmap() {
        const mindmapOption = createMindmapOption("mindmap");
        this.mindmap = new Mindmap(mindmapOption);
        this.addEvetListener();
    }

    private async initMindmapData() {
        const mindmapData: IMindmapNodeData = {
            id: 1,
            label: "虚拟现实",
            children: [{
                id: 2,
                label: "竞品分析",
                infos: {
                    template: "ConceptCorporationPanel",
                },
                children: []
            }, {
                id: 3,
                label: "关键技术",
                infos: {
                    template: "TechnologyPanel",
                    data: {
                        edges: [{
                            node: {
                                id: 1,
                                name: "倒装芯片专利技术",
                                description: "简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术",
                                corporations: {
                                    edges: [{
                                        node: {
                                            corporation: {
                                                name: "三星",
                                                country: {
                                                    code: "cn"
                                                }
                                            }
                                        }
                                    }]
                                }
                            }
                        }, {
                            node: {
                                id: 2,
                                name: "倒装芯片专利技术",
                                description: "简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术",
                                corporations: {
                                    edges: [{
                                        node: {
                                            corporation: {
                                                name: "三星",
                                                country: {
                                                    code: "cn"
                                                }
                                            }
                                        }
                                    }]
                                }
                            }
                        }]
                    }
                },
                children: []
            }, {
                id: 4,
                label: "龙头企业",
                infos: {
                    template: "ConceptCorporationPanel",
                    data: {
                        statistics: [{
                            country: "cn",
                            number: 23
                        }, {
                            country: "us",
                            number: 16
                        }],
                        connection: {
                            edges: [{
                                node: {
                                    id: 1,
                                    description: "三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED",
                                    corporation: {
                                        name: "三星",
                                    }
                                }
                            }, {
                                node: {
                                    id: 2,
                                    description: "三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED",
                                    corporation: {
                                        name: "三星",
                                    }
                                }
                            }]
                        }
                    }
                },
                children: []
            }]
        };
        this.mindmap.initialData(mindmapData);
        this.mindmap.render();
        this.mindmap.graph.fitView();
        this.mindmap.graph.fitCenter();
    }

    private addEvetListener() {
        if (!this.mindmap) { return; }

        this.mindmap.on("node:selected", (node: INode) => {
            this.selectedNode = node.getModel();
        });
    }
}
</script>

<style scoped lang="scss">
#mindmap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.node-detail-panel {
    box-shadow: 3px 0 6px rgba($color: #000000, $alpha: 0.5);
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 300px;
}
</style>
