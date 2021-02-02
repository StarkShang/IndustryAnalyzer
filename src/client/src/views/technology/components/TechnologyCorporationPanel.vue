<template>
    <div>
        <div class="corporation-overview">
            <country-statistics-panel :statistics="statistics"></country-statistics-panel>
            <button>增加相关企业信息</button>
        </div>
        <div>
            <connection-panel :connection="connection">
                <template slot-scope="{ edge }">
                    <technology-corporation-item :info="edge.node"></technology-corporation-item>
                </template>
            </connection-panel>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Connection, CountryStatistic, TechnologyRelatedCorporationInfo } from "@/common/models";
import CountryStatisticsPanel from "@/common/components/CountryStatisticsPanel.vue";
import ConnectionPanel from "@/common/components/ConnectionPanel.vue";
import TechnologyCorporationItem from "@/common/components/TechnologyCorporationItem.vue";

@Component({
    name: "TechnologyCorporationPanel",
    components: {
        CountryStatisticsPanel,
        ConnectionPanel,
        TechnologyCorporationItem,
    }
})
export default class TechnologyCorporationPanel extends Vue {
    @Prop({ default: () => [] }) public statistics!: CountryStatistic[];
    @Prop({ default: () => Connection.Default }) public connection!: Connection<TechnologyRelatedCorporationInfo>;
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
