<template>
    <div class="patent-item">
        <div>
            <span class="patent-title">
                {{ patent.title }}
            </span>
        </div>
        <div class="patent-number">
            专利号{{ patent.number }}
        </div>
        <div class="patent-infos">
            <span v-if="patent.owner" class="patent-info">
                {{ patent.owner.name }}
                <country-flag class="patent-owner-flag" :country="patent.owner.country.code"></country-flag>
            </span>
            <span class="patent-info">
                {{ patent.applyDate | date("YYYY-MM-DD") }}申请时间
            </span>
            <span class="patent-info">
                {{ patent.publicDate | date("YYYY-MM-DD") }}公开时间
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Patent } from "@/common/models";
import { absoluteDate } from "@/common/filters";

@Component({
    name: "PatentItem",
    filters: {
        date: absoluteDate
    }
})
export default class PatentItem extends Vue {
    @Prop({ default: () => Patent.Empty }) public patent!: Patent;

}
</script>

<style scoped lang="scss">

.patent-item {
    .patent-title {
        font-weight: bold;
    }
    .patent-number {
        font-size: 0.8em;
    }

    .patent-infos {
        font-size: 0.8em;

        .patent-owner-flag {
            width: 0.8em;
            height: 0.8em;
            margin-left: 0.25em;
        }

        .patent-info {
            display: inline-flex;
            align-items: center;
            &+ .patent-info{
                margin-left: 1em;
            }
        }
    }
    & + .patent-item {
        margin-top: 1em;
    }
}
</style>
