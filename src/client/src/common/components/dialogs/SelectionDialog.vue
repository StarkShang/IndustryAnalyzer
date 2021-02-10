<template>
    <el-dialog
        class="select-dialog commonDialog"
        :title="title"
        :visible="visible"
        :close-on-click-modal="false"
        @update:visible="closeDialog"
        width="500px"
        :show-close="false"
        :append-to-body="true">
            <el-autocomplete
                v-model="keyword"
                ref="keywordInput"
                class="search-input"
                size="mini"
                :fetch-suggestions="searchItems"
                :placeholder="placeholder"
                :trigger-on-focus="false"
                @select="handleSelect">
                <template slot-scope="{ item }">
                    <slot :item="item"></slot>
                </template>
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    class="mergeDialogSearchBtn">
                </el-button>
            </el-autocomplete>
            <div>
                <slot name="addition"></slot>
            </div>

            <div v-if="multiple" class="listContainer">
                <div class="item"
                    :key="index"
                    v-for="(item, index) in resultList">
                    <div class="left">
                        <i class="el-icon-close" @click="handleRemove(index)"></i>
                    </div>
                    <div class="right">
                        <span>{{ item[valueKey] }}</span>
                    </div>
                </div>
            </div>

            <div v-if="multiple" class="btnGroup">
                <el-button type="primary" size="mini"
                    :disabled="resultList.length < 1"
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
import { Component, Mixins, Prop, Vue, Watch } from "vue-property-decorator";
import DialogMixin from "./dialog";

@Component({
    name: "SelectionDialog"
})
export default class SelectionDialog extends Mixins(Vue, DialogMixin) {
    @Prop({ default: () => "选择对象" }) public title: string;
    @Prop({ default: () => "请输入内容" }) public placeholder: string;
    @Prop({ default: true }) public multiple: boolean;
    @Prop({ default: "name" }) public valueKey!: string;
    public keyword = "";
    public resultList: Array<any> = [];

    public searchItems(queryString: string, callback) {
        this.$emit("search", queryString, callback);
    }

    public handleRemove(index: number) {
        if (index >= 0 && index < this.resultList.length) {
            this.resultList.splice(index, 1);
        }
    }

    public handleSelect(item) {
        if (this.multiple) {
            const index = this.resultList.findIndex(e => e.value === item.value);
            if (index === -1) {
                this.resultList.push(item);
            }

            this.keyword = "";
        } else {
            this.$emit("confirm", item);
            this.closeDialog();
        }
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
        this.$emit("confirm", this.resultList);
        this.closeDialog();
    }

    public closeDialog() {
        this.resultList = [];
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

.search-input {
    width: 100%;
    margin-bottom: 0.5em;
}

.btnGroup {
    margin-top: 1em;
}
</style>
