<template>
    <div>
        <div class="body">
            <div>
                {{ viewmodel.concept.description }}
            </div>
            <el-tabs v-model="activeTabName">
                <el-tab-pane label="产业链" name="chains">
                </el-tab-pane>
                <el-tab-pane label="竞品分析" name="competitors">
                    <competitor-panel></competitor-panel>
                </el-tab-pane>
                <el-tab-pane label="关键技术" name="technologies">
                    <concept-technology-panel
                        :connection="viewmodel.concept.technologies">
                    </concept-technology-panel>
                </el-tab-pane>
                <el-tab-pane label="龙头企业" name="corporations">
                    <concept-corporation-panel
                        :statistics="viewmodel.corporationStatistics"
                        :connection="viewmodel.concept.corporations">
                    </concept-corporation-panel>
                </el-tab-pane>
            </el-tabs>
        </div>
        <page-header class="header">
            {{ viewmodel.concept.name }}
        </page-header>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Concept, ConceptRelatedCorporationInfo, Corporation, CountryStatistic, Technology, TechnologyRelatedCorporationInfo } from "@/common/models";
import PageHeader from "@/common/components/PageHeader.vue";
import CompetitorPanel from "./components/CompetitorPanel.vue";
import ConceptTechnologyPanel from "./components/ConceptTechnologyPanel.vue";
import ConceptCorporationPanel from "./components/ConceptCorporationPanel.vue";

class ViewModel {
    public concept = Concept.Empty;
    public corporationStatistics: CountryStatistic[] = [];
}

@Component({
    name: "ConceptDetail",
    components: {
        PageHeader,
        CompetitorPanel,
        ConceptTechnologyPanel,
        ConceptCorporationPanel,
    }
})
export default class ConceptDetail extends Vue {
    public viewmodel = new ViewModel();
    public activeTabName = "chains";

    public created(): void {
        this.viewmodel.concept.name = "虚拟现实/增强显示";
        this.viewmodel.concept.description = "虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍\n虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍虚拟现实/增强显示介绍";

        const data1 = CountryStatistic.Empty;
        data1.country = "cn";
        data1.number = 23;
        const data2 = CountryStatistic.Empty;
        data2.country = "us";
        data2.number = 16;
        this.viewmodel.corporationStatistics.push(data1);
        this.viewmodel.corporationStatistics.push(data2);

        const tech1 = Technology.Empty;
        tech1.name = "倒装芯片专利技术";
        tech1.description = "简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术";
        const techCorp1 = TechnologyRelatedCorporationInfo.Empty;
        techCorp1.corporation.name = "三星";
        techCorp1.corporation.country.code = "cn";
        tech1.corporations.append(techCorp1);
        const tech2 = Technology.Empty;
        tech2.name = "倒装芯片专利技术";
        tech2.description = "简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术简述倒装芯片技术";
        this.viewmodel.concept.technologies.append(tech1);
        this.viewmodel.concept.technologies.append(tech2);

        const corp1 = ConceptRelatedCorporationInfo.Empty;
        corp1.corporation = Corporation.Empty;
        corp1.corporation.name = "三星";
        corp1.description = "三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED";
        const corp2 = ConceptRelatedCorporationInfo.Empty;
        corp2.corporation = Corporation.Empty;
        corp2.corporation.name = "三星";
        corp2.description = "三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED三星发力MicroLED";
        this.viewmodel.concept.corporations.append(corp1);
        this.viewmodel.concept.corporations.append(corp1);
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
