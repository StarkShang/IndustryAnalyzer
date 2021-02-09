<template>
    <div ref="nodeDetailPanel" class="node-detail-panel">
        <div class="panel-resizer"
            @mousedown="startResize"
            @mouseup="stopResize">
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

class ViewModel {
    resize = {
        enable: false,
        originWidth: 0,
        originMouseX: 0
    }
}

@Component({
    name: "NodeDetailPanel"
})
export default class NodeDetailPanel extends Vue {
    public viewmodel = new ViewModel();

    public startResize(event: MouseEvent) {
        this.viewmodel.resize.enable = true;
        const panel = this.$refs["nodeDetailPanel"] as HTMLDivElement;
        const originWidth = /\d+(?=px)/.exec(window.getComputedStyle(panel).width);
        this.viewmodel.resize.originWidth = parseInt(originWidth[0]);
        this.viewmodel.resize.originMouseX = event.clientX;
        document.addEventListener("mousemove", this.resizePanel);
        document.addEventListener("mouseup", this.stopResize);
    }

    public resizePanel(event: MouseEvent) {
        const moveDistance = event.clientX - this.viewmodel.resize.originMouseX;
        const panel = this.$refs["nodeDetailPanel"] as HTMLDivElement;
        panel.style.width = this.viewmodel.resize.originWidth - moveDistance + "px";
    }

    public stopResize(event: MouseEvent) {
        this.viewmodel.resize.enable = false;
        document.removeEventListener("mousemove", this.resizePanel);
        document.removeEventListener("mouseup", this.stopResize);
    }
}
</script>

<style scoped lang="scss">
.node-detail-panel {
    position: relative;

    .panel-resizer {
        position: absolute;
        left: 0;
        width: 3px;
        height: 100%;
        cursor: w-resize;
    }
}
</style>
