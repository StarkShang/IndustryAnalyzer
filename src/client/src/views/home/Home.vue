<template>
    <div class="home">
        <div class="home-header">
            <h3>主页</h3>
            <span class="home-header-suffix">
                <el-button size="mini" @click="openConceptEditor">新建</el-button>
            </span>
        </div>
        <div>
            <div class="section-title">快速访问</div>
            <span v-for="concept in recent" :key="concept.id"
                class="recent-concept"
                @click="navigateToConceptDetail(concept)">
                {{ concept.name }}
            </span>
        </div>
        <div class="concept-list">
            <div class="section-title">全部概念</div>
            <connection-panel :connection="concepts">
                <template slot-scope="{ edge }">
                    <concept-item :concept="edge.node"
                        @select="navigateToConceptDetail">
                    </concept-item>
                </template>
            </connection-panel>
        </div>

        <concept-editor
            :visible.sync="viewmodel.conceptEditorVisible">
        </concept-editor>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Concept, Connection } from "@/common/models";
import ConceptItem from "@/common/components/ConceptItem.vue";
import ConnectionPanel from "@/common/components/ConnectionPanel.vue";
import ConceptEditor from "@/common/components/dialogs/ConceptEditor.vue";

class ViewModel {
    public conceptEditorVisible = false;
}

@Component({
    name: "Home",
    components: {
        ConnectionPanel,
        ConceptItem,
        ConceptEditor
    }
})
export default class Home extends Vue {
    public concepts: Connection<Concept> = Connection.Default;
    public recent: Concept[] = [];
    public viewmodel = new ViewModel();

    public created(): void {
        const concept1 = Concept.Empty;
        concept1.id = 1;
        concept1.name = "虚拟现实";
        const concept2 = Concept.Empty;
        concept2.id = 2;
        concept2.name = "MicroLED";
        this.concepts.append(concept1);
        this.concepts.append(concept2);
        this.recent.push(concept1);
        this.recent.push(concept2);
    }

    public navigateToConceptDetail(concept: Concept): void {
        if (concept) {
            this.$router.push({
                name: "ConceptDetail",
                params: { id: concept.id.toString() }
            });
        }
    }

    public openConceptEditor() {
        this.viewmodel.conceptEditorVisible = true;
    }
}
</script>

<style scoped lang="scss">
.home {
    margin: 0 auto;
    max-width: 1200px;
    padding: 2em;

    .section-title {
        font-weight: bold;
        margin-bottom: 0.5em;
    }

    .recent-concept {
        display: inline-block;
        padding: 0.5em;
        border-radius: 2px;
        border: solid 1px grey;
        font-weight: bold;
        color: grey;
        cursor: pointer;

        &:hover {
            border-color: #409EFF;
        }

        & + .recent-concept {
            margin-left: 1em;
        }
    }

    .concept-list {
        margin-top: 1em;
    }
}
.home-header {
    display: flex;
    align-items: center;

    .home-header-suffix {
        margin-left: auto;
    }
}

</style>
