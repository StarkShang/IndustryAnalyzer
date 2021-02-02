<template>
    <div>
        <div class="news-timeline-header">
            <span class="news-year">{{ activeYear }}</span>
            <span>
                <slot></slot>
            </span>
        </div>
        <div>
            <connection-panel :connection="news">
                <template slot-scope="{ edge }">
                    <news-item :news="edge.node"></news-item>
                </template>
            </connection-panel>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Connection, News } from "../models";
import ConnectionPanel from "./ConnectionPanel.vue";
import NewsItem from "./NewsItem.vue";

@Component({
    name: "NewsTimeline",
    components: {
        ConnectionPanel,
        NewsItem,
    }
})
export default class NewsTimeline extends Vue {
    @Prop({ default: () => Connection.Empty }) public news!: Connection<News>;

    public created(): void {
        const news1 = News.Empty;
        news1.title = "发布110英寸家用Micro LED电视";
        news1.content = "2020年12月10日，三星110英寸Micro LED电视在韩国正式开启预售，并将于2021年第一季度在全球发售。该款电视拥有99.99％的屏占比，定位大众消费市场，售价1.7亿韩元（约合102.6万元人民币）。";
        const news2 = News.Empty;
        news2.title = "展示583英寸的8K企业级Micro LED显示器“The Wall”";
        news2.content = "ISE展上，三星展示一款583英寸的8K企业级Micro LED显示器“The Wall”，新款取代了三星到目前为止提供的最大的437英寸面板。新款“The Wall”还具有219英寸和292英寸的4K版本。";
        this.news.append(news1);
        this.news.append(news2);
    }

    public get activeYear(): number {
        return 2021;
    }
}
</script>

<style scoped lang="scss">
.news-timeline-header {
    font-size: 1.15em;
    margin-bottom: 1em;
}
.news-year {
    font-weight: bold;
}
</style>
