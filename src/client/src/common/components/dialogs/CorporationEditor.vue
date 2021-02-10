<template>
    <el-dialog
        :title="dialogTitle"
        width="30%"
        :visible.sync="visible"
        :before-close="closeDialog"
        :append-to-body="true">
        <div>
            <div>
                <input class="at-input" type="text"
                    placeholder="企业名称"
                    v-model="form.name">
                <country-selector @select="handleCountrySelected"></country-selector>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="closeDialog">取 消</el-button>
            <el-button size="mini" type="primary"
                :disabled="!canConfirm"
                @click="handleConfirmEdit">
                确 定
            </el-button>
        </span>
    </el-dialog>
</template>

<script lang="ts">
import { Corporation, EditCorporationInput } from "@/common/models";
import { Country } from "@attonex/vue-country";
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import DialogMixin from "./dialog";

@Component({
    name: "CorporationEditor"
})
export default class CorporationEditor extends Mixins(Vue, DialogMixin) {
    @Prop() public corporation?: Corporation;
    public form = EditCorporationInput.Empty;
    public dialogTitle = "新建企业";

    public get canConfirm(): boolean {
        return !!this.form.name && !!this.form.country;
    }

    public created(): void {
        if (this.corporation) {
            this.form.id = this.corporation.id;
            this.form.name = this.corporation.name;
            this.form.country = this.corporation.country;
            this.dialogTitle = "编辑企业";
        }
    }

    public handleCountrySelected(country: Country): void {
        this.form.country = country;
    }

    public handleConfirmEdit(): void {
        this.$emit("confirm", this.form);
        this.closeDialog();
        this.form = EditCorporationInput.Empty;
    }
}
</script>

<style>

</style>
