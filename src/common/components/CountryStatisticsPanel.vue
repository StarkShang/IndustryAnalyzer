<template>
    <div>
        <span v-for="data in statistics" :key="data.country">
            <span>{{ data.country }}</span>{{ data.number }}
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

<style>

</style>
