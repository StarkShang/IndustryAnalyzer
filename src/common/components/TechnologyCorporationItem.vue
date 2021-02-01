<template>
    <div class="technology-corporation-item">
        <div class="corporation-info">
            <span class="corporation-name">{{ info.corporation.name }}</span>
            <country-flag country="us" type="circle" class="corporation-country-flag"></country-flag>
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

    .corporation-info {
        display: flex;
        align-items: center;
        .corporation-name {
            font-weight: bold;
        }
        .corporation-country-flag {
            width: 0.8em;
            height: 0.8em;
            margin-left: 0.5em;
        }
    }

}
.technology-corporation-item + .technology-corporation-item {
    margin-top: 1em;
}
</style>
