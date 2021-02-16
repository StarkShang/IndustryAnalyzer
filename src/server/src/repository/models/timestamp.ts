import { DataTypes } from "sequelize";

export interface Timestamp {
    createdAt: Date;
    updatedAt: Date;
}

export const TimestampEntity = {
    createdAt: {
        type: DataTypes.DATE(6),
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE(6),
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}
