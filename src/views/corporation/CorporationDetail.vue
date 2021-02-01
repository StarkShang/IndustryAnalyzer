<template>
    <div>
        <div class="body">
            <div>
                {{ viewmodel.corporation.description }}
            </div>
            <el-tabs v-model="activeTabName">
                <el-tab-pane label="大事记" name="events">
                    <news-timeline></news-timeline>
                </el-tab-pane>
                <el-tab-pane label="核心技术" name="technologies">
                </el-tab-pane>
                <el-tab-pane label="竞争优势" name="strengths">
                </el-tab-pane>
                <el-tab-pane label="产业链布局" name="chains">
                </el-tab-pane>
            </el-tabs>
        </div>
        <page-header class="header">
            {{ viewmodel.corporation.corporation.name }}
        </page-header>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ConceptRelatedCorporationInfo } from "@/common/models";
import PageHeader from "@/common/components/PageHeader.vue";
import NewsTimeline from "@/common/components/NewsTimeline.vue";

class ViewModel {
    public corporation = ConceptRelatedCorporationInfo.Empty;
}

@Component({
    name: "CorporationDetail",
    components: {
        PageHeader,
        NewsTimeline
    }
})
export default class CorporationDetail extends Vue {
    public viewmodel = new ViewModel();
    public activeTabName = "events";

    public created(): void {
        this.viewmodel.corporation.description = "企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍企业在该领域的相关介绍";
        this.viewmodel.corporation.corporation.name = "三星";
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
