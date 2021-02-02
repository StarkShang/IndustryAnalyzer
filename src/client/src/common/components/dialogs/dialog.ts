import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    name: "DialogMixin"
})
export default class DialogMixin extends Vue {
    @Prop({ default: false }) public visible!: boolean;

    public closeDialog(): void {
        this.$emit("update:visible", false);
    }
}
