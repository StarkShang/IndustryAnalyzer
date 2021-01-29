<template>
    <div class="news-item">
        <span class="news-datetime">
            <div class="news-time">{{ news.date | time }}</div>
            <div class="news-date">{{ news.date | date }}</div>
            <div class="news-decorator"></div>
        </span>
        <span class="news-body">
            <div class="news-title">{{ news.title }}</div>
            <div class="news-content">{{ news.content }}</div>
        </span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { News } from "../models";
import { year, date, time } from "../filters";

@Component({
    name: "NewsItem",
    filters: {
        year,
        date,
        time
    }
})
export default class NewsItem extends Vue {
    @Prop({ default: () => News.Empty }) public news!: News;
}
</script>

<style scoped lang="scss">
.news-item {
    display: flex;
    margin-bottom: 2em;

    .news-datetime {
        text-align: center;
        position: relative;

        .news-time {
            font-size: 0.8em;
            line-height: 1em;
        }
        .news-date {
            font-weight: bold;
        }
        .news-decorator {
            width: 2px;
            border-radius: 1px;
            background: grey;
            position: absolute;
            top: 2.5em;
            bottom: -1em;
            left: 0;
            right: 0;
            margin: auto;
        }
    }

    .news-body {
        flex: 1;
        margin-left: 2em;

        .news-title {
            font-weight: bold;
            line-height: 1em;
            margin-bottom: 0.25em;
        }
        .news-content {
            font-size: 0.8em;
            word-break: break-all;
            text-align: justify;
        }
    }
}

</style>
