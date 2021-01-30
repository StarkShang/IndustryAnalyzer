<template>
    <div class="technology-corporation-item">
        <div class="corporation-name">
            <span>{{ info.corporation.name }}</span>
        </div>
        <div>
            {{ info.description }}
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TechnologyRelatedCorporationInfo } from "../models";

@Component({
    name: "TechnologyCorporationItem"
})
export default class TechnologyCorporationItem extends Vue{
    @Prop({ default: () => TechnologyRelatedCorporationInfo.Empty }) public info!: TechnologyRelatedCorporationInfo;
}
</script>

<style scoped lang="scss">
.technology-corporation-item {
    .corporation-name {
        font-weight: bold;
    }
}
.technology-corporation-item + .technology-corporation-item {
    margin-top: 1em;
}
</style>
