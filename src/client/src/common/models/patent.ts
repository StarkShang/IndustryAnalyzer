import { Corporation } from "./corporation";

export class Patent {
    public id = -1;
    public title = "";
    public number = "";
    public applyDate: Date | string = new Date();
    public publicDate: Date | string = new Date();
    public owner = Corporation.Empty;

    public static get Empty(): Patent {
        return new Patent();
    }
}
