import { Sequelize, DataTypes, Model } from "sequelize";
import Timestamp from "./timestamp";

export class CorporationEntity extends Model { }

export function init(sequelize: Sequelize) {
    CorporationEntity.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ...Timestamp
    }, {
        sequelize,
        modelName: "corporation"
    });
}
