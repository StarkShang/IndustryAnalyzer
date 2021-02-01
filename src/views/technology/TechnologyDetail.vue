<template>
    <div>
        <div class="body">
            <div>
                {{ viewmodel.technology.description }}
            </div>
            <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
                <el-tab-pane label="科研进展" name="researches">
                    <news-timeline></news-timeline>
                </el-tab-pane>
                <el-tab-pane label="相关企业" name="corporations">
                    <technology-corporation-panel
                        :statistics="viewmodel.technologyCorporationStatistics"
                        :connection="viewmodel.technology.corporations">
                    </technology-corporation-panel>
                </el-tab-pane>
                <el-tab-pane label="相关专利" name="patents">
                    <patent-panel
                        :statistics="viewmodel.patentStatistics"
                        :connection="viewmodel.technology.patents">
                    </patent-panel>
                </el-tab-pane>
            </el-tabs>
        </div>
        <page-header class="header">
            {{ viewmodel.technology.name }}
        </page-header>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Corporation, Country, CountryStatistic, Patent, Technology, TechnologyRelatedCorporationInfo } from "@/common/models";
import PageHeader from "@/common/components/PageHeader.vue";
import NewsTimeline from "@/common/components/NewsTimeline.vue";
import TechnologyCorporationPanel from "./components/TechnologyCorporationPanel.vue";
import PatentPanel from "./components/PatentPanel.vue";

class ViewModel {
    public technology = Technology.Empty;
    public technologyCorporationStatistics: CountryStatistic[] = [];
    public patentStatistics: CountryStatistic[] = [];
}

@Component({
    name: "TechnologyDetail",
    components: {
        PageHeader,
        NewsTimeline,
        TechnologyCorporationPanel,
        PatentPanel,
    },
})
export default class TechnologyDetail extends Vue {
    public viewmodel = new ViewModel();
    public activeTabName = "researches";

    public get activeTabComponent(): string {
        switch (this.activeTabName) {
            case "researches": return "NewsTimeline";
            case "corporations": return "TechnologyCorporationPanel";
            default: return "";
        }
    }

    public created(): void {
        this.viewmodel.technology.name = "芯片倒装技术";
        this.viewmodel.technology.description = "芯片倒装技术的描述芯片倒装技术的描述芯片倒装技术的描述芯片倒装技术的描述芯片倒装技术的描述芯片倒装技术的描述芯片倒装技术的描述芯片倒装技术的描述芯片倒装技术的描述芯片倒装技术的描述芯片倒装技术的描述芯片倒装技术的描述芯片倒装技术的描述芯片倒装技术的描述";
        const data1 = CountryStatistic.Empty;
        data1.country = "cn";
        data1.number = 23;
        const data2 = CountryStatistic.Empty;
        data2.country = "us";
        data2.number = 16;
        this.viewmodel.technologyCorporationStatistics.push(data1);
        this.viewmodel.technologyCorporationStatistics.push(data2);
        this.viewmodel.patentStatistics.push(data1);
        this.viewmodel.patentStatistics.push(data2);

        const corp1 = TechnologyRelatedCorporationInfo.Empty;
        corp1.corporation = Corporation.Empty;
        corp1.corporation.name = "三星";
        corp1.description = "三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术";
        const corp2 = TechnologyRelatedCorporationInfo.Empty;
        corp2.corporation = Corporation.Empty;
        corp2.corporation.name = "三星";
        corp2.description = "三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术三星集团掌握了芯片倒装技术";
        this.viewmodel.technology.corporations.append(corp1);
        this.viewmodel.technology.corporations.append(corp1);

        const patent1 = Patent.Empty;
        patent1.title = "芯片倒装技术专利";
        patent1.number = "123asdasdasdsd";
        patent1.owner = Corporation.Empty;
        patent1.owner.name = "三星";
        patent1.owner.country.code = "cn";
        this.viewmodel.technology.patents.append(patent1);
    }

    public handleTabClick(tab: string): void {
        console.log(tab);
    }
}
</script>

<style scoped lang="scss">
.header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;

    box-shadow: 0 3px 6px rgba($color: #000000, $alpha: 0.15);
}
.body {
    margin: 0 auto;
    max-width: 1200px;
}
</style>
