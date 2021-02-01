<template>
    <div class="technology-item">
        <div>
            <span class="technology-name">{{ technology.name }}</span>
        </div>
        <div class="technology-description">
            {{ technology.description }}
        </div>
        <div v-if="corporations">
            <span v-for="corporation in corporations" :key="corporation.id"
                class="technology-corporation">
                {{ corporation.name }}
                <country-flag class="corporation-country-flag" :country="corporation.country.code"></country-flag>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Corporation, Technology } from "../models";

@Component({
    name: "TechnologyItem"
})
export default class TechnologyItem extends Vue{
    @Prop({ default: () => Technology.Empty }) public technology!: Technology;

    public get corporations(): Corporation[] {
        const corporations = this.technology.corporations.edges.map(edge => edge.node.corporation);
        return corporations;
    }
}
</script>

<style scoped lang="scss">
.technology-item {
    .technology-name {
        font-weight: bold;
    }
    .technology-description {
        font-size: 0.8em;
        text-indent: 2em;
    }
    .technology-corporation {
        font-size: 0.8em;
        display: inline-flex;
        align-items: center;
        .corporation-country-flag {
            width: 1em;
            height: 1em;
            margin-left: 0.2em;
        }
    }
}

.technology-item + .technology-item {
    margin-top: 1em;
}
</style>
