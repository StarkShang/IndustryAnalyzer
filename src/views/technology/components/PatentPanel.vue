<template>
    <div>
        <div class="patent-overview">
            <country-statistics-panel :statistics="statistics"></country-statistics-panel>
            <button>增加相关专利</button>
        </div>
        <div>
            <connection-panel :connection="connection">
                <template slot-scope="{ edge }">
                    <patent-item :patent="edge.node"></patent-item>
                </template>
            </connection-panel>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Connection, CountryStatistic, Patent } from "@/common/models";
import CountryStatisticsPanel from "@/common/components/CountryStatisticsPanel.vue";
import ConnectionPanel from "@/common/components/ConnectionPanel.vue";
import PatentItem from "@/common/components/PatentItem.vue";

@Component({
    name: "PatentPanel",
    components: {
        CountryStatisticsPanel,
        ConnectionPanel,
        PatentItem,
    }
})
export default class PatentPanel extends Vue {
    @Prop({ default: () => [] }) public statistics!: CountryStatistic[];
    @Prop({ default: () => Connection.Default }) public connection!: Connection<Patent>;
}
</script>

<style scoped lang="scss">
.patent-overview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
}
</style>
