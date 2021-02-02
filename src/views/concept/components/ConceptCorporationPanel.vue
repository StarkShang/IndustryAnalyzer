<template>
    <div>
        <div class="corporation-overview">
            <country-statistics-panel :statistics="statistics"></country-statistics-panel>
            <button>增加相关企业信息</button>
        </div>
        <div>
            <connection-panel :connection="connection">
                <template slot-scope="{ edge }">
                    <concept-corporation-item
                        :info="edge.node"
                        @select="handleCorporationSelected">
                    </concept-corporation-item>
                </template>
            </connection-panel>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ConceptRelatedCorporationInfo, Connection, CountryStatistic } from "@/common/models";
import CountryStatisticsPanel from "@/common/components/CountryStatisticsPanel.vue";
import ConnectionPanel from "@/common/components/ConnectionPanel.vue";
import ConceptCorporationItem from "@/common/components/ConceptCorporationItem.vue";

@Component({
    name: "ConceptCorporationPanel",
    components: {
        CountryStatisticsPanel,
        ConnectionPanel,
        ConceptCorporationItem,
    }
})
export default class ConceptCorporationPanel extends Vue {
    @Prop({ default: () => [] }) public statistics!: CountryStatistic[];
    @Prop({ default: () => Connection.Default }) public connection!: Connection<ConceptRelatedCorporationInfo>;

    public handleCorporationSelected(corporation: ConceptRelatedCorporationInfo): void {
        this.$emit("select", corporation)
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
