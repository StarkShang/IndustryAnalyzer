import { Sequelize, DataTypes, Model } from "sequelize";
import Timestamp from "./timestamp";

export class Corporation extends Model {}

export function init(sequelize: Sequelize) {
    Corporation.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
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
