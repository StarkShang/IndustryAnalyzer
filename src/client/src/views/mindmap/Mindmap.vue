<template>
    <div id="mindmap">
        <node-detail-panel class="node-detail-panel"></node-detail-panel>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Mindmap, IMindmapNodeData, IMindmapNode } from "@attonex-private/mindmap";
import { createMindmapOption } from "./utils/configuration";
import NodeDetailPanel from "./components/NodeDetailPanel.vue";

@Component({
    name: "MindmapPage",
    components: {
        NodeDetailPanel
    }
})
export default class MindmapPage extends Vue {
    public mindmap: Mindmap!;

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
            label: "123",
            children: []
        };
        this.mindmap.initialData(mindmapData);
        this.mindmap.render();
        this.mindmap.graph.fitView();
        this.mindmap.graph.fitCenter();
    }

    private addEvetListener() {
        console.log("addEvetListener");

        if (!this.mindmap) { return; }

        this.mindmap.on("node:selected", (node: IMindmapNode) => {
            console.log(node);
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
