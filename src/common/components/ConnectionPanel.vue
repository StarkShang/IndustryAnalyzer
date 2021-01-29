<template>
    <div class="connection-panel">
        <template v-if="connection && connection.edges && connection.edges.length > 0">
            <template v-for="(edge, index) in connection.edges">
                <slot :edge="edge" :index="index"></slot>
            </template>
            <p v-if="showEndProp" style="text-align:center">这是我的底线</p>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Connection } from "@/common/models/connection";

@Component({
    name: "ConnectionPanel"
})
export default class ConnectionPanel extends Vue {
    @Prop({ default: () => Connection.Default }) public connection!: Connection<unknown>;
    @Prop({ default: false }) public showEnd!: boolean;
    public get showEndProp(): boolean {
        return this.showEnd && !this.connection.pageInfo.hasNextPage;
    }
}
</script>

<style scoped lang="scss">
.empty-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;

    svg{
        font-size: 80px;
    }
}
</style>
