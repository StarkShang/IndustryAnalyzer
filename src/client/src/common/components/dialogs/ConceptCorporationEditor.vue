<template>
    <el-dialog
        class="select-dialog commonDialog"
        title="新增相关企业"
        width="500px"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :show-close="false"
        :append-to-body="true">
        <el-autocomplete
            v-model="keyword"
            ref="keywordInput"
            class="search-input"
            size="mini"
            placeholder="搜索企业"
            :fetch-suggestions="searchItems"
            :trigger-on-focus="false"
            @select="handleSelect">
            <template slot-scope="{ item }">
                <div>
                    {{ item.name }}
                </div>
            </template>
            <el-button
                slot="append"
                icon="el-icon-search"
                class="mergeDialogSearchBtn">
            </el-button>
        </el-autocomplete>
        <div class="addition-button">
            +&nbsp;新增企业
        </div>
        <textarea class="at-input" type="text" placeholder="对企业进行简单描述" v-model="corporationDescription"></textarea>

        <div class="listContainer">
            <div class="item"
                :key="index"
                v-for="(item, index) in candidates">
                <div class="left">
                    <i class="el-icon-close" @click="handleRemove(index)"></i>
                </div>
                <div class="right">
                    <span>{{ item.corporation.name }}</span>
                </div>
            </div>
        </div>

        <div class="btnGroup">
            <el-button type="primary" size="mini"
                :disabled="!canAddToCandidates"
                @click="addToCandidates">
                添加
            </el-button>
            <el-button type="primary" size="mini"
                :disabled="candidates.length < 1"
                @click="confirmSelection">
                确定
            </el-button>
            <el-button size="mini" @click="closeDialog">
                取消
            </el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { ConceptRelatedCorporationInfo, Corporation } from "@/common/models";
import { Component, Mixins, Prop, Vue, Watch } from "vue-property-decorator";
import DialogMixin from "./dialog";

@Component({
    name: "ConceptCorporationEditor"
})
export default class ConceptCorporationEditor extends Mixins(Vue, DialogMixin) {
    @Prop({ default: "name" }) public valueKey!: string;
    public keyword = "";
    public selectedCorporation: Corporation | null = null;
    public corporationDescription = "";
    public candidates: Array<ConceptRelatedCorporationInfo> = [];

    public get canAddToCandidates(): boolean {
        return !!this.selectedCorporation && !!this.corporationDescription;
    }

    public searchItems(queryString: string, callback) {
        this.$emit("search", queryString, callback);
    }

    public handleRemove(index: number) {
        if (index >= 0 && index < this.candidates.length) {
            this.candidates.splice(index, 1);
        }
    }

    public handleSelect(corporation: Corporation) {
        this.keyword = corporation.name;
        this.selectedCorporation = corporation;
    }

    public addToCandidates() {
        const info = new ConceptRelatedCorporationInfo(this.corporationDescription, this.selectedCorporation);
        const index = this.candidates.findIndex(e => e.corporation.id === info.corporation.id);
        if (index === -1) {
            this.candidates.push(info);
        }
        this.keyword = "";
        this.selectedCorporation = null;
        this.corporationDescription = "";
    }

    @Watch("visible")
    public handleVisibilityChange() {
        if (!this.visible) {
            this.keyword = ""; // 清除keyword
        } else {
            if (this.$refs.keywordInput) {
                (this.$refs.keywordInput as HTMLElement).focus();
            }
        }
    }

    // 确认的时候可能需要进行校验
    // 因此吧关闭对话框的权限移交给调用者
    public confirmSelection() {
        this.$emit("confirm", this.candidates);
        this.closeDialog();
    }

    public closeDialog() {
        this.candidates = [];
        this.$emit("update:visible", false);
    }
}
</script>

<style scoped lang="scss">
.select-dialog {
    .mergeDialogSearchBtn:focus,
    .mergeDialogSearchBtn:hover {
        background-color: transparent;
    }
}

.addition-button {
    cursor: pointer;
    color: $active-color;
    font-size: 0.8em;
}

.listContainer {
    .item {
        margin-top: 0.5em;
        padding: 5px 0;
        display: flex;
        .left {
            cursor: pointer;
            opacity: 0;
            margin-right: 5px;
        }
        .left {
            opacity: 1;
        }
    }
}

.search-input {
    width: 100%;
    margin-bottom: 0.5em;
}

.btnGroup {
    margin-top: 1em;
}
</style>
