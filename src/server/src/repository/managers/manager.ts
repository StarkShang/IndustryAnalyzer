import { Sequelize } from "sequelize";

export class DbManager {
    public constructor(protected sequelize: Sequelize) {}
}
