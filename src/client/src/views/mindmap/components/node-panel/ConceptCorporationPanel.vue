<template>
    <div class="concept-corporation-panel">
        <div class="corporation-overview">
            <country-statistics-panel :statistics="data.statistics"></country-statistics-panel>
            <button @click="viewmodel.editor.visible=true">增加相关企业信息</button>
        </div>
        <div class="corporation-list">
            <connection-panel :connection="data.connection">
                <template slot-scope="{ edge }">
                    <concept-corporation-item
                        :info="edge.node"
                        @select="handleCorporationSelected">
                    </concept-corporation-item>
                </template>
            </connection-panel>
        </div>
        <concept-corporation-editor :visible.sync="viewmodel.editor.visible"
            @search="searchCorporations"
            @add="viewmodel.corporationEditor.visible=true"
            @confirm="addConceptCorporation">
        </concept-corporation-editor>
        <corporation-editor
            :visible.sync="viewmodel.corporationEditor.visible"
            @confirm="handleCorporationCreated">
        </corporation-editor>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ConceptRelatedCorporationInfo, Connection, Corporation, Country, CountryStatistic, CreateConceptRelatedCorporationInput, EditCorporationInput } from "@/common/models";
import CountryStatisticsPanel from "@/common/components/CountryStatisticsPanel.vue";
import ConnectionPanel from "@/common/components/ConnectionPanel.vue";
import ConceptCorporationItem from "@/common/components/ConceptCorporationItem.vue";
import ConceptCorporationEditor from "@/common/components/dialogs/ConceptCorporationEditor.vue";
import CorporationEditor from "@/common/components/dialogs/CorporationEditor.vue";
import { createConceptRelatedCorporations, createOrUpdateCorporation, searchCorporations } from "../../graphql";

class ViewModel {
    public conceptId = -1;
    public editor = {
        visible: false
    };
    public corporationEditor = {
        visible: false
    }
}

@Component({
    name: "ConceptCorporationPanel",
    components: {
        CountryStatisticsPanel,
        ConnectionPanel,
        ConceptCorporationItem,
        ConceptCorporationEditor,
        CorporationEditor,
    }
})
export default class ConceptCorporationPanel extends Vue {
    @Prop({
        default: () => ({
            statistics: [],
            connection: Connection.Default
        })
    }) public data!: { statistics: CountryStatistic[], connection: Connection<ConceptRelatedCorporationInfo> }
    public viewmodel = new ViewModel();

    public created() {
        this.viewmodel.conceptId = parseInt(this.$route.params.id);
    }

    public async searchCorporations(queryString: string, callback: (data: Corporation[]) => void): Promise<void> {
        const corporations = await searchCorporations(queryString);
        callback(corporations);
    }

    public handleCorporationSelected(corporation: ConceptRelatedCorporationInfo): void {
        this.$emit("select", corporation);
    }

    public async addConceptCorporation(infos: ConceptRelatedCorporationInfo[]) {
        const input: CreateConceptRelatedCorporationInput[] = infos.map(info => ({
            description: info.description,
            conceptId: this.viewmodel.conceptId,
            corporationId: info.corporation.id
        }));
        const corporations = await createConceptRelatedCorporations(input);
        Connection.unshiftNodes(this.data.connection, corporations);
    }

    public async handleCorporationCreated(input: EditCorporationInput): Promise<void> {
        if (!input.country) {
            return;
        }
        const response = await createOrUpdateCorporation({
            id: input.id,
            name: input.name,
            country: input.country.code
        });
        console.log(response);
    }
}
</script>

<style scoped lang="scss">
.concept-corporation-panel {
    width: 100%;
    display: flex;
    flex-direction: column;
    .corporation-overview {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1em;
    }
    .corporation-list {
        flex: 1;
        overflow-y: auto;
    }
}
</style>
