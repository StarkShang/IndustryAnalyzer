import { Sequelize } from "sequelize";
import { buildEntities } from "@/repository";

export default async (): Promise<Sequelize> => {
    const sequelize = new Sequelize("sqlite::memory:", {
        dialect: "sqlite",
        define: {
            freezeTableName: true,
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
            timestamps: true,
            paranoid: false,
            underscored: true
        },
        logging: false
    });

    await buildEntities(sequelize);
    await sequelize.sync({ force: true });
    return sequelize;
}
