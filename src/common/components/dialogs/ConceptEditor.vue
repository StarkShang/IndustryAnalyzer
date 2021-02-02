<template>
    <el-dialog
        title=""
        :visible.sync="visible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import DialogMixin from "./dialog";

@Component({
    name: "ConceptEditor"
})
export default class ConceptEditor extends Mixins(Vue, DialogMixin) {
    @Prop({ default: "编辑概念" }) public title!: string;

    public handleClose(): void {
        this.closeDialog();
    }
}
</script>

<style>

</style>
