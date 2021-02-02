<template>
    <div>
        <span class="country-data" v-for="data in statistics" :key="data.country">
            <country-flag class="country-icon" :country="data.country"></country-flag>
            {{ data.number }}
        </span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CountryStatistic } from "../models";

@Component({
    name: "CountryStatisticsPanel"
})
export default class CountryStatisticsPanel extends Vue {
    @Prop({ default: () => [] }) public statistics!: CountryStatistic[];
}
</script>

<style scoped lang="scss">
.country-data {
    display: inline-flex;
    align-items: center;
    font-weight: bold;

    .country-icon {
        width: 1em;
        height: 1em;
        margin-right: 0.25em;
    }

    &+.country-data {
        margin-left: 1em;
    }
}
</style>
