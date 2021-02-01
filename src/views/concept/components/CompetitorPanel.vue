<template>
    <div>
        <el-table
            border
            :data="contrasts"
            style="width: 100%">
            <el-table-column
                v-for="competitor in competitors"
                :prop="competitor.name"
                :label="competitor.name"
                :key="competitor.name">
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Connection, Technology } from "@/common/models";
import CountryStatisticsPanel from "@/common/components/CountryStatisticsPanel.vue";
import ConnectionPanel from "@/common/components/ConnectionPanel.vue";
import TechnologyItem from "@/common/components/TechnologyItem.vue";

@Component({
    name: "CompetitorPanel",
    components: {
        CountryStatisticsPanel,
        ConnectionPanel,
        TechnologyItem,
    }
})
export default class CompetitorPanel extends Vue {
    public competitors = [{
        name: "公司1"
    }, {
        name: "公司2"
    }, {
        name: "公司3"
    }];
    public contrasts = [{
        "公司1": "123123123",
        "公司2": "123123123",
        "公司3": "123123123",
    }];
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
