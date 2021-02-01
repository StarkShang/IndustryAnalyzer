<template>
    <div class="concept-corporation-item">
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
import { ConceptRelatedCorporationInfo } from "../models";

@Component({
    name: "ConceptCorporationItem"
})
export default class ConceptCorporationItem extends Vue{
    @Prop({ default: () => ConceptRelatedCorporationInfo.Empty }) public info!: ConceptRelatedCorporationInfo;
}
</script>

<style scoped lang="scss">
.concept-corporation-item {

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
.concept-corporation-item + .concept-corporation-item {
    margin-top: 1em;
}
</style>
