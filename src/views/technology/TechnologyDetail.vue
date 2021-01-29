<template>
    <div>
        <div class="body">
            <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
                <el-tab-pane label="科研进展" name="researches"></el-tab-pane>
                <el-tab-pane label="相关企业" name="corporations"></el-tab-pane>
                <el-tab-pane label="相关专利" name="patents"></el-tab-pane>
            </el-tabs>

            <keep-alive>
                <component v-bind:is="activeTabComponent"></component>
            </keep-alive>
        </div>
        <page-header class="header">
            {{ viewmodel.technology.name }}
        </page-header>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Technology } from "@/common/models";
import PageHeader from "@/common/components/PageHeader.vue";
import NewsTimeline from "@/common/components/NewsTimeline.vue";

class ViewModel {
    public technology = Technology.Empty;
}

@Component({
    name: "TechnologyDetail",
    components: {
        PageHeader,
        NewsTimeline,
    },
})
export default class TechnologyDetail extends Vue {
    public viewmodel = new ViewModel();
    public activeTabName = "researches";

    public get activeTabComponent(): string {
        switch (this.activeTabName) {
            case "researches": return "NewsTimeline";
            default: return "";
        }
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
