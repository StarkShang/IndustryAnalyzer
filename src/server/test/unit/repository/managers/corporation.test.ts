import { CorporationManager } from "@/repository/managers";
import { expect } from "chai";
import initDatabase from "../index";

describe("CorporationManager", () => {
    let manager!: CorporationManager;
    beforeEach(async () => {
        const sequelize = await initDatabase();
        manager = new CorporationManager(sequelize);
    });

    it("create", async () => {
        const result = await manager.create({
            name: "华为",
            country: "cn"
        });
        // 检测返回值
        expect(result.id).not.null;
        expect(result.name).equals("华为", "返回值name出错");
        expect(result.country).equals("cn", "返回值country出错");
    });
});
