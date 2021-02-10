<template>
    <el-dialog
        title=""
        width="30%"
        :visible.sync="visible"
        :before-close="handleClose"
        :append-to-body="true">
        <div>
            <div>
                <input class="at-input" type="text"
                    placeholder="技术名称"
                    v-model="technology.name">
                <textarea class="at-input" type="text"
                    placeholder="对技术进行简单描述吧"
                    v-model="technology.description">
                </textarea>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script lang="ts">
import { Technology } from "@/common/models";
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import DialogMixin from "./dialog";

@Component({
    name: "TechnologyEditor"
})
export default class TechnologyEditor extends Mixins(Vue, DialogMixin) {
    @Prop({ default: "编辑技术" }) public title!: string;
    @Prop({ default: () => Technology.Empty }) public technology!: Technology;

    public handleClose(): void {
        this.closeDialog();
    }
}
</script>

<style>

</style>
