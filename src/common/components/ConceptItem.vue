<template>
    <div class="concept-item">
        <div @click="handleConceptNameClicked">
            <span class="concept-name">
                {{ concept.name }}
            </span>
        </div>
        <div></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Concept } from "../models";

@Component({
    name: "ConceptItem"
})
export default class ConceptItem extends Vue {
    @Prop({ default: () => Concept.Empty }) public concept!: Concept;
    public handleConceptNameClicked(): void {
        this.$emit("select", this.concept);
    }
}
</script>

<style scoped lang="scss">
.concept-item {
    .concept-name {
        cursor: pointer;
    }
    & + .concept-item {
        margin-top: 1em;
    }
}
</style>
