<template>
    <div class="header-container">
        <div class="header-content">
            <span>
                <span class="back-button" @click="back">
                    <i class="el-icon-arrow-left"></i>
                </span>
                <slot name="header"></slot>
            </span>
            <span class="header-title">
                <slot></slot>
            </span>
            <span>
                <slot name="footer"></slot>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import router from "@/router";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    name: "PageHeader",
})
export default class PageHeader extends Vue {
    @Prop({ default: "" }) public title!: string;
    @Prop({ default: () => () => router.back() }) public back!: () => void;
}
</script>

<style scoped lang="scss">
.header-container {
    background-color: white;

    .header-content {
        display: flex;
        max-width: 1200px;
        padding: 1em;
        margin: 0 auto;

        .back-button {
            cursor: pointer;
        }
        .header-title {
            margin: 0 auto;
        }
    }
}
</style>
