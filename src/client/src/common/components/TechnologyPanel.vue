<template>
    <div>
        <div class="corporation-overview">
            <button>增加相关技术信息</button>
        </div>
        <div>
            <connection-panel :connection="data">
                <template slot-scope="{ edge }">
                    <technology-item @select="handleTechnologySelected" :technology="edge.node"></technology-item>
                </template>
            </connection-panel>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Connection, Technology } from "@/common/models";
import CountryStatisticsPanel from "@/common/components/CountryStatisticsPanel.vue";
import ConnectionPanel from "@/common/components/ConnectionPanel.vue";
import TechnologyItem from "@/common/components/TechnologyItem.vue";

@Component({
    name: "TechnologyPanel",
    components: {
        CountryStatisticsPanel,
        ConnectionPanel,
        TechnologyItem,
    }
})
export default class TechnologyPanel extends Vue {
    @Prop({ default: () => Connection.Default }) public data!: Connection<Technology>;

    public handleTechnologySelected(technology: Technology): void {
        this.$emit("select", technology);
    }
}
</script>

<style scoped lang="scss">
.corporation-overview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
}
</style>
