<template>
    <div ref="nodeDetailPanel" class="node-detail-panel" v-if="node">
        <div class="node-detail-content">
            <div v-if="tabInfos" class="tab-infos">
                <span v-for="tabInfo in node.infos"
                    class="tab-info"
                    :key="tabInfo.key"
                    :class="{ 'tab-info-active': tabInfo.key === currentTabInfo.key }"
                    @click="changeTab(tabInfo)">
                    {{ tabInfo.name }}
                </span>
            </div>
            <template v-if="currentTabInfo">
                <keep-alive>
                    <component
                        class=""
                        :is="currentTabInfo.template"
                        :data="currentTabInfo.data">
                    </component>
                </keep-alive>
            </template>
        </div>
        <div class="panel-resizer"
            @mousedown="startResize"
            @mouseup="stopResize">
        </div>
    </div>
</template>

<script lang="ts">
import { MindmapNode, NodeInfo } from "../models/Node";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ConceptCorporationPanel from "./node-panel/ConceptCorporationPanel.vue";
import TechnologyPanel from "./node-panel/TechnologyPanel.vue";

class ViewModel {
    public resize = {
        enable: false,
        originWidth: 0,
        originMouseX: 0
    };
}

@Component({
    name: "NodeDetailPanel",
    components: {
        ConceptCorporationPanel,
        TechnologyPanel
    }
})
export default class NodeDetailPanel extends Vue {
    @Prop({ default: () => null }) node!: MindmapNode | null;
    public viewmodel = new ViewModel();
    public currentTabInfo: NodeInfo | null = null;

    public get tabInfos(): NodeInfo[] | null {
        if (this.node) {
            if (Array.isArray(this.node.infos)) {
                return this.node.infos;
            }
        }
        return null;
    }

    @Watch("node")
    public handleNodeChanged(): void {
        if (!this.node) { return; }
        if (Array.isArray(this.node.infos)) {
            if (this.node.infos.length > 0) {
                this.currentTabInfo = this.node.infos[0];
            }
        } else {
            if (this.node.infos) {
                this.currentTabInfo = this.node.infos;
            }
        }
    }

    public changeTab(tabInfo: NodeInfo): void {
        console.log(tabInfo);
        this.currentTabInfo = tabInfo;
    }

    public startResize(event: MouseEvent): void {
        this.viewmodel.resize.enable = true;
        const panel = this.$refs["nodeDetailPanel"] as HTMLDivElement;
        const originWidth = /\d+(?=px)/.exec(window.getComputedStyle(panel).width);
        if (originWidth) {
            this.viewmodel.resize.originWidth = parseInt(originWidth[0]);
            this.viewmodel.resize.originMouseX = event.clientX;
            document.addEventListener("mousemove", this.resizePanel);
            document.addEventListener("mouseup", this.stopResize);
        }
    }

    public resizePanel(event: MouseEvent): void {
        const moveDistance = event.clientX - this.viewmodel.resize.originMouseX;
        const panel = this.$refs["nodeDetailPanel"] as HTMLDivElement;
        panel.style.width = this.viewmodel.resize.originWidth - moveDistance + "px";
    }

    public stopResize(): void {
        this.viewmodel.resize.enable = false;
        document.removeEventListener("mousemove", this.resizePanel);
        document.removeEventListener("mouseup", this.stopResize);
    }
}
</script>

<style scoped lang="scss">
.node-detail-panel {
    position: relative;
    padding: 0.5em 1em;
    box-sizing: border-box;

    .node-detail-content {
        height: 100%;
        display: flex;
    }

    .tab-infos {
        margin-bottom: 1em;
        font-size: 0.8em;
        white-space: nowrap;
        .tab-info {
            cursor: pointer;
            padding-bottom: 5px;
            &:hover {
                color: $active-color;
            }
            & + .tab-info {
                margin-left: 0.5em;
            }
        }
        .tab-info-active {
            color: $active-color;
            position: relative;

            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                width: 20px;
                height: 2px;
                background-color: $active-color;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }

    .panel-resizer {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        cursor: w-resize;
    }
}
</style>
