<template>
    <div class="concept-corporation-item">
        <div class="corporation-info">
            <span class="corporation-name" @click="handleCorporationNameClicked">
                {{ info.corporation.name }}
            </span>
            <country-flag country="us" type="circle" class="corporation-country-flag"></country-flag>
        </div>
        <div class="corporation-description">
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
    public handleCorporationNameClicked(): void {
        this.$emit("select", this.info);
    }
}
</script>

<style scoped lang="scss">
.concept-corporation-item {

    .corporation-info {
        display: flex;
        align-items: center;
        .corporation-name {
            font-weight: bold;
            cursor: pointer;
        }
        .corporation-country-flag {
            width: 0.8em;
            height: 0.8em;
            margin-left: 0.5em;
        }
    }

    .corporation-description {
        font-size: 0.8em;
        text-indent: 2em;
        word-break: break-all;
    }
}
.concept-corporation-item + .concept-corporation-item {
    margin-top: 1em;
}
</style>
