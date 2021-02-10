<template>
    <div class="technology-panel">
        <div class="technology-overview">
            <button @click="viewmodel.selector.visible = true">增加相关技术信息</button>
        </div>
        <div class="technology-list">
            <connection-panel :connection="data">
                <template slot-scope="{ edge }">
                    <technology-item @select="handleTechnologySelected" :technology="edge.node"></technology-item>
                </template>
            </connection-panel>
        </div>
        <selection-dialog
            value-key="name"
            title="选择技术"
            :visible.sync="viewmodel.selector.visible"
            @search="searchTechnologies">
            <div slot="addition" class="addition-button" @click="viewmodel.editor.visible = true">
                + 新增一项技术
            </div>
            <div slot-scope="{item}">
                {{ item }}
            </div>
        </selection-dialog>
        <technology-editor :visible.sync="viewmodel.editor.visible">
        </technology-editor>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Connection, Technology } from "@/common/models";
import CountryStatisticsPanel from "@/common/components/CountryStatisticsPanel.vue";
import ConnectionPanel from "@/common/components/ConnectionPanel.vue";
import TechnologyItem from "@/common/components/TechnologyItem.vue";
import TechnologyEditor from "@/common/components/dialogs/TechnologtEditor.vue";
import SelectionDialog from "@/common/components/dialogs/SelectionDialog.vue";

class ViewModel {
    public editor = {
        visible: false
    };
    public selector = {
        visible: false
    };
}

@Component({
    name: "TechnologyPanel",
    components: {
        CountryStatisticsPanel,
        ConnectionPanel,
        TechnologyItem,
        TechnologyEditor,
        SelectionDialog,
    }
})
export default class TechnologyPanel extends Vue {
    @Prop({ default: () => Connection.Default }) public data!: Connection<Technology>;
    public viewmodel = new ViewModel();

    public searchTechnologies(queryString: string, callback: (data: any) => void) {
        callback([{
            id: 1,
            name: "123",
            description: "123edsadds"
        }]);
    }

    public handleTechnologySelected(technology: Technology): void {
        this.$emit("select", technology);
    }
}
</script>

<style scoped lang="scss">
.technology-panel {
    width: 100%;
    display: flex;
    flex-direction: column;

    .technology-overview {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1em;
    }

    .technology-list {
        flex: 1;
        overflow-y: auto;
    }
}

.addition-button {
    cursor: pointer;
    color: $active-color;
    font-size: 0.8em;
}

::v-deep.el-dialog__body {
    padding-top: 15px;
}
</style>
