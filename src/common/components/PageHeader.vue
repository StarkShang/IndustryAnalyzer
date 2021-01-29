<template>
    <div class="header-container">
        <div class="header-content">
            <span>
                <i class="el-icon-arrow-left"></i>
                <slot name="header"></slot>
            </span>
            <span>
                <slot></slot>
            </span>
            <span>
                <slot name="footer"></slot>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    name: "PageHeader",
})
export default class PageHeader extends Vue {
    @Prop({ default: "" }) public title!: string;
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
    }
}
</style>
